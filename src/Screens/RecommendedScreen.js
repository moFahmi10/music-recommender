import { useEffect, useState } from 'react';
import { Link ,useParams,useLocation} from 'react-router-dom';
import { getSelectedSongs } from '../Services/SongService';
import "./RecommendedScreen.css"
const RecommendedScreen = () =>{
  const {state} = useLocation();
  const [nbRecommendedSongs,setNbRecommendedSongs] = useState([]);
  const [rfRecommendedSongs,setRfRecommendedSongs] = useState([]);
  const [knnRecommendedSongs,setKnnRecommendedSongs] = useState([]);
  const nbAccuracy = parseFloat(state.nb_accuracy.toFixed(2));
  const rfAccuracy = parseFloat(state.rf_accuracy.toFixed(2));
  const knnAccuracy = parseFloat(state.knn_accuracy.toFixed(2));
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
    setAllRecommendedSongs([{"list":res1,"accuracy":nbAccuracy,"algorithm":"Naive Bayes","id":"1"},
    {"list":res2,"accuracy":rfAccuracy,"algorithm":"Random Forest","id":"2"},
    {"list":res3,"accuracy":knnAccuracy,"algorithm":"KNN","id":"3"}
  ]);
    
  }, []);
 

//const { recommendedView } = route.params;

    return(
        <div >
        <h1 className="welcome-message">Recommendations based on your history</h1>

        <main class="st_viewport">
{allRecommendedSongs.map(recommendedObj=>(
  <div class="st_wrap_table" data-table_id={recommendedObj.id}>
    <header class="st_table_header">
      <h2>{recommendedObj.algorithm} with accuracy:{recommendedObj.accuracy}</h2>
      <div class="st_row">
        <div class="st_column _rank">Song</div>
        <div class="st_column _name">Artist</div>
        <div class="st_column _surname">Genre</div>
        <div class="st_column _year">Release Year</div>
    
      </div>
    </header>
    <div class="st_table">
    {recommendedObj.list.map(song => (
      <div class="st_row">
        <div class="st_column _rank">{song.track_name}</div>
        <div class="st_column _name">{song.artist_name}</div>
        <div class="st_column _surname">{song.genre}</div>
        <div class="st_column _year">{song.release_date}</div>
      </div>
       ))}
    </div>
  </div>
  ))}
  </main>

    
      </div>
   
    );

}
export default RecommendedScreen;