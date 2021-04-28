import { Route,Routes } from 'react-router-dom';
import './App.css';
import BottomNavbar from './components/BottomNavbar';
import WatchVideo from './components/WatchVideo';
import SeeAllVideosPage from './components/SeeAllVideosPage';

import PlayListPage from './Pages/Playlist/PlayListPage';
import LandingPage from './Pages/Home/LandingPage';
import WatchLater from './Pages/Watchlater/WatchLater';
import History from './Pages/History/History';
import ViewPlaylist from './Pages/ViewPlaylist/ViewPlaylist';

const App = () => {
  return (
    <div>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/watch/:videoID" element={<WatchVideo/>}/>
            <Route path="/videos/:type" element={<SeeAllVideosPage/>}/>
            <Route path="/playlist/videos/:type" element={<SeeAllVideosPage/>}/>
            <Route path="/playlist" element={<PlayListPage/>}/>
            <Route path="/playlist/:playlistID" element={<ViewPlaylist/>}/>
            <Route path="/watchlater" element={<WatchLater/>}/>
            <Route path="/history" element={<History/>}/>
          </Routes>
          <BottomNavbar/>
    </div>
      
  );
};

export default App;
