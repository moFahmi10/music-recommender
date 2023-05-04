import { useEffect, useState } from 'react';
import { Link ,useParams,useLocation} from 'react-router-dom';
import { getSelectedSongs } from '../Services/SongService';
import "./UserHistoryScreen.css"
import { getUserHistory } from '../Services/SongService';

const UserHistoryScreen = () =>{
    const [userHistory,setUserHistory] = useState([]);
    useEffect(() => {
        
        const getUserHistoryFromDB = async()=>{
            const res = await getUserHistory();
            const idArray = res.map(song => song.song_id);
            const songsArray = getSelectedSongs(idArray);
            setUserHistory(songsArray);
        }
        getUserHistoryFromDB().then();

        
    }, []);
    



        return(
            <div >
            <h1 className="welcome-message">User history</h1>

            <main class="st_viewport">

    <div class="st_wrap_table" data-table_id="1">
        <header class="st_table_header">
        {/* <h2>{recommendedObj.algorithm} with accuracy:{recommendedObj.accuracy}</h2> */}
        <div class="st_row">
            <div class="st_column _rank">Song</div>
            <div class="st_column _name">Artist</div>
            <div class="st_column _surname">Genre</div>
            <div class="st_column _year">Release Year</div>
        
        </div>
        </header>
        <div class="st_table">
        {userHistory.map(song => (
        <div class="st_row">
            <div class="st_column _rank">{song.track_name}</div>
            <div class="st_column _name">{song.artist_name}</div>
            <div class="st_column _surname">{song.genre}</div>
            <div class="st_column _year">{song.release_date}</div>
        </div>
        ))}
        </div>
    </div>
  
    </main>

        
        </div>
    
        );

    }
export default UserHistoryScreen;