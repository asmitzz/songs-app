import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import './App.css';
import BottomNavbar from './components/BottomNavbar';
import LandingPage from './components/LandingPage';
import PlayListPage from './components/PlayListPage';
import SeeAllVideosPage from './components/SeeAllVideosPage';

const App = () => {
  return (
    <div>
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/videos/:type/" exact component={SeeAllVideosPage}/>
            <Route path="/videos/:type/:id" exact component={SeeAllVideosPage}/>
            <Route path="/playlist" exact component={PlayListPage}/>
          </Switch>
          <BottomNavbar/>
        </Router>
    </div>
      
  );
};

export default App;
