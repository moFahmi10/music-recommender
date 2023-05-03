import React, { useState, useEffect } from 'react';
import { Link, useNavigate   } from 'react-router-dom';
import {getSongs, getUserHistory, saveUserHistoryToFile} from '../Services/SongService';
import './SongList.css';
function SongList() {
  const apiUrl = process.env.REACT_APP_FLASK_URL;
  const [songs, setSongs] = useState([]);
  const [userHistory, setUserHistory] = useState([]); 
  const [recommended,setRecommended] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState(10); // Change this as needed
  const [showPlayButtonPressedDiv, setShowPlayButtonPressedDiv] = useState(false);
  const [showSkipButtonPressedDiv, setShowSkipButtonPressedDiv] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchSongs() {
      const response = await getSongs();
      const response2 = await getUserHistory();
      setSongs(response);
      console.log(response2)
      setUserHistory(response2)
    }

    fetchSongs();
  }, []);
  function handleRecommend() {
    const maxRetries = 3;
    let retries = 0;
    const documents = userHistory.map(doc => {
      const { _id, ...rest } = doc;
      return rest;
    });
    function doFetch() {
      fetch(apiUrl + '/train', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(documents),
      })
        .then(response => {
          // Handle the response as before
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
  
          function readStream() {
            reader.read().then(({ done, value }) => {
              if (done) {
                return;
              }
  
              const text = decoder.decode(value);
              console.log(text)
              const recommendedView = JSON.parse(text);
              navigate('/recommended', {
                state: recommendedView
              });
            });
          }
  
          readStream();
        })
        .catch(err => {
          // Handle the error and retry if possible
          if (retries < maxRetries) {
            retries++;
            console.log(`Error: ${err}. Retrying (${retries} of ${maxRetries})...`);
            doFetch();
          } else {
            console.log(`Error: ${err}. Maximum number of retries (${maxRetries}) exceeded.`);
          }
        });
    }
  
  
    doFetch();
  }

 

  async function handlePlay(songId) {
    setShowPlayButtonPressedDiv(true);
    setTimeout(() => {
      setShowPlayButtonPressedDiv(false);
    }, 1000);
    // play the song with the given id
    const songToUpdate = userHistory.find((song) => song.song_id === songId);
    if(songToUpdate){
      songToUpdate.play_count =  songToUpdate.play_count +1  
    }
    else{
      const newSong = {"song_id":songId,"play_count":1,"skip_count":0}
      userHistory.push(newSong);
    }
    await saveUserHistoryToFile(userHistory)
    console.log(userHistory)  
    // Show the div and set a timeout to hide it after a second

  };

  async function handleSkip(songId) {
    // Show the div and set a timeout to hide it after a second
    setShowSkipButtonPressedDiv(true);
    setTimeout(() => {
      setShowSkipButtonPressedDiv(false);
    }, 1000);
    // skip the song with the given id
    const songToUpdate = userHistory.find((song) => song.song_id === songId);

    if(songToUpdate){
      songToUpdate.skip_count =  songToUpdate.skip_count +1  
    }
    else{
      const newSong = {"song_id":songId,"play_count":0,"skip_count":1}
      userHistory.push(newSong);
    }
    await saveUserHistoryToFile(userHistory)
    console.log(userHistory)  

  }

  // Get current songs
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(songs.length / songsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Get the current page numbers to display
  const getPageNumbersToDisplay = () => {
    if (pageNumbers.length <= 5) {
      return pageNumbers;
    }
    if (currentPage <= 3) {
      return pageNumbers.slice(0, 5);
    }
    if (currentPage >= pageNumbers.length - 2) {
      return pageNumbers.slice(pageNumbers.length - 5, pageNumbers.length);
    }
    return pageNumbers.slice(currentPage - 3, currentPage + 2);
  };

  return (
    <div>
   <table className="table">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Release Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSongs.map(song => (
            <tr key={song.song_id}>
              <td>{song.track_name}</td>
              <td>{song.artist_name}</td>
              <td>{song.genre}</td>
              <td>{song.release_date}</td>
              <td>
                
            <button onClick={() => handlePlay(song.song_id)} type="button" class="btn btn--purple">
              <span class="btn__txt">Play</span>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
            </button>
                
                <button onClick={() => handleSkip(song.song_id)} type="button" class="btn btn--yellow">
              <span class="btn__txt">Skip</span>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
      <div className='recommend'>
      
            
            <button onClick={handleRecommend} type="button" class="btn btn--green">
              <span class="btn__txt">Get Recommendations</span>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
            </button>

      </div>
      
      <nav className='pagination-nav'>
        <ul className="pagination">
          {currentPage !== 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
          )}

          {getPageNumbersToDisplay().map((number) => (
            <li key={number}  className={`page-item ${currentPage === number ? 'active' : ''}`} >
              <button className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}

          {currentPage !== pageNumbers.length && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
       
        {showPlayButtonPressedDiv && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', textAlign: 'center', padding: '10px', zIndex: '9999' }}>
        Played Song!
        </div>
        )}
              {showSkipButtonPressedDiv && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', textAlign: 'center', padding: '10px', zIndex: '9999' }}>
        Skipped Song!
        </div>
        )}
    </div>

          
  );
}

export default SongList;