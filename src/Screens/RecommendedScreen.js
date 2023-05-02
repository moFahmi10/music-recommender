import { useEffect, useState } from 'react';
import { Link ,useParams,useLocation} from 'react-router-dom';
import { getSelectedSongs } from '../Services/SongService';
import "./RecommendedScreen.css"
const RecommendedScreen = () =>{
  const {state} = useLocation();
  const [nbRecommendedSongs,setNbRecommendedSongs] = useState([]);
  const [rfRecommendedSongs,setRfRecommendedSongs] = useState([]);
  const [knnRecommendedSongs,setKnnRecommendedSongs] = useState([]);
  const nbAccuracy = state.nb_accuracy;
  const rfAccuracy = state.rf_accuracy;
  const knnAccuracy = state.knn_accuracy;
  const nbIdArray = state.nb_recommended_songs.map(song => song.song_id);
  const rfIdArray = state.rf_recommended_songs.map(song => song.song_id);
  const knnIdArray = state.knn_recommended_songs.map(song => song.song_id);
  const [allRecommendedSongs,setAllRecommendedSongs] = useState([]);
  useEffect(() => {
    
   
    const res1= getSelectedSongs(nbIdArray)
    setNbRecommendedSongs(res1)
    const res2 = getSelectedSongs(rfIdArray)
    setRfRecommendedSongs(res2)
    const res3 = getSelectedSongs(knnIdArray)
    setKnnRecommendedSongs(res3)
    setAllRecommendedSongs([{"list":res1,"accuracy":nbAccuracy},{"list":res2,"accuracy":rfAccuracy},{"list":res3,"accuracy":knnAccuracy}]);
    
  }, []);
 

//const { recommendedView } = route.params;

    return(
        <div >
        <h1 className="welcome-message">Recommendations based on your history</h1>

        {allRecommendedSongs.map(recommendedObj=>(
            <table className="table">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Release Year</th>
              </tr>
            </thead>
            <tbody>
              {recommendedObj.list.map(song => (
                <tr key={song.song_id}>
                  <td>{song.track_name}</td>
                  <td>{song.artist_name}</td>
                  <td>{song.genre}</td>
                  <td>{song.release_date}</td>
                </tr>
              ))}
            </tbody>
              Accuracy:{recommendedObj.accuracy}
          </table>

        ))}
      

    
      </div>
   
    );

}
export default RecommendedScreen;