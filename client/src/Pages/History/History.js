import React,{useEffect} from 'react';
import ReactPlayer from 'react-player';
import { Link,useNavigate } from 'react-router-dom';

import { useVideos } from '../../contexts/VideosContextProvider';

const History = () => {

    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])

    const {history,removeFromHistory} = useVideos();
    const navigate = useNavigate();

    return (
        <div className="seeAllVideos__container">
            <div className="seeAllVideos__container__header">
               <button onClick={() => navigate(-1)} className="header__button"><i className="fa fa-arrow-left"></i></button>
                <h2>Recently Played</h2>
            </div>
            <div className="cards">
            {
                history.map( video => (
                  <div key={video._id}>
                  <Link to={`/watch/${video._id}`} className="thumbnail__link">
                    <ReactPlayer width="100%" height="180px" playIcon={<i className="fas fa-play-circle"></i>} url={video.url} light={true}/>
                  </Link>
                     <div className="d-flex justify-content-space-between">
                       <div>
                          <h4>{video.title}</h4>
                          <small>Released date : {video.releasedDate}</small>
                       </div>
                       <button className="delete__btn" onClick={() => removeFromHistory(video._id)} title="Remove"><i className="fa fa-trash"></i></button>
                     </div>
                  </div>
                )).reverse()
            }
            </div>
        </div>
    )
}

export default History;

