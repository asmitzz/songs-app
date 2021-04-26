import { Route,Routes } from 'react-router-dom';
import './App.css';
import BottomNavbar from './components/BottomNavbar';
import LandingPage from './components/LandingPage';
import WatchVideo from './components/WatchVideo';
import PlayListPage from './components/PlayListPage';
import SeeAllVideosPage from './components/SeeAllVideosPage';


const App = () => {
  return (
    <div>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/watch/:videoID" element={<WatchVideo/>}/>
            <Route path="/videos/:type" element={<SeeAllVideosPage/>}/>
            <Route path="/playlist" element={<PlayListPage/>}/>
          </Routes>
          <BottomNavbar/>
    </div>
      
  );
};

export default App;
