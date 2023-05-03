import { Link } from 'react-router-dom';
import "./HomeScreen.css"
const HomeScreen = () =>{
    return(
        <div className="home-screen">
        <h1 className="welcome-message">Welcome to the Music Recommender App!</h1>
        <Link to="/SongList"  class="btn btn--green" >
        <span class="btn__txt">Explore Music</span>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
              <i class="btn__bg" aria-hidden="true"></i>
        </Link>
        
    
            
      </div>
   
    );

}
export default HomeScreen;