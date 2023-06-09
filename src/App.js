import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route,Link,Routes,Outlet } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import SongList from './Screens/SongList';
import RecommendedScreen from './Screens/RecommendedScreen';
import UserHistoryScreen from './Screens/UserHistoryScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen/>} />
          <Route path="SongList" element={<SongList />} />
          <Route path="history" element={<UserHistoryScreen />} />
          <Route path="recommended" element={<RecommendedScreen/>} />
        </Route>
      </Routes>
    </Router>
 
  );
}
const Layout = () => {
  return (
    <>
      <nav className='main-nav'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/SongList">Music</Link>
          </li>
          <li>
            <Link to="/history">User History</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};



function About() {
  return <h1>About us</h1>;
}

function Contact() {
  return <h1>Contact us</h1>;
}

export default App;
