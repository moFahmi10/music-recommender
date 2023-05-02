import { Link } from 'react-router-dom';
import "./HomeScreen.css"
const HomeScreen = () =>{
    return(
        <div className="home-screen">
        <h1 className="welcome-message">Welcome to the Music Recommender App!</h1>
        <Link to="/SongList" className="recommendations-link">Find Music Recommendations</Link>
      </div>
   
    );

}
export default HomeScreen;