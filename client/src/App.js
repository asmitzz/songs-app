import { Route,Routes } from 'react-router-dom';
import './App.css';
import BottomNavbar from './components/BottomNavbar';
import VideoPlayer from './components/VideoPlayer';
import SeeAllVideosPage from './components/SeeAllVideosPage';

import PlayListPage from './Pages/Playlist/PlayListPage';
import LandingPage from './Pages/Home/LandingPage';
import WatchLater from './Pages/Watchlater/WatchLater';
import History from './Pages/History/History';
import ViewPlaylist from './Pages/ViewPlaylist/ViewPlaylist';

import PrivateRoute from './utils/PrivateRoute';
import RouteNotFound from './utils/RouteNotFound';
import Login from './Auth/Login';
import SignUp from './Auth/Signup';
import MyLibrary from './Pages/MyLibrary/MyLibrary';

const App = () => {
  return (
    <div>
         
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/watch/:videoID" element={<VideoPlayer/>}/>
            <Route path="/videos/:type" element={<SeeAllVideosPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>

            <PrivateRoute path="/playlist" element={<PlayListPage/>}/>
            <PrivateRoute path="/playlist/:playlistID" element={<ViewPlaylist/>}/>
            <PrivateRoute path="/watchlater" element={<WatchLater/>}/>
            <PrivateRoute path="/history" element={<History/>}/>
            <PrivateRoute path="/mylibrary" element={<MyLibrary/>}/>
            <Route path="*" element={<RouteNotFound/>}/>
          </Routes>
          <BottomNavbar/>
    </div>
      
  );
};

export default App;
