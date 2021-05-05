import React,{useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import { Link,useNavigate } from 'react-router-dom';

import { useVideos } from '../../contexts/VideosContextProvider';
import Toast from '../../utils/Toast';

const WatchLater = () => {

    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])

    const {watchLater,handleWatchLater} = useVideos();
    const navigate = useNavigate();
    const [errorToast,setErrorToast] = useState(false);

    return (
        <div className="seeAllVideos__container">
            <Toast show={errorToast} error={true} background="red" onClick={() => setErrorToast(false)} color="white" message="Something went wrong with server"/>
            <div className="seeAllVideos__container__header">
               <button onClick={() => navigate(-1)} className="header__button"><i className="fa fa-arrow-left"></i></button>
                <h2>Watch Later</h2>
            </div>
            
            <div className="cards">
            {
                watchLater.map( video => (
                  <div key={video._id}>
                  <Link to={`/watch/${video._id}`} className="thumbnail__link">
                    <ReactPlayer width="100%" height="180px" playIcon={<i className="fas fa-play-circle"></i>} url={video.url} light={true}/>
                  </Link>
                     <div className="d-flex justify-content-space-between">
                       <div>
                          <h4>{video.title}</h4>
                          <small>Released date : {video.releasedDate}</small>
                       </div>
                       <button className="delete__btn" title="Remove" onClick={()=>handleWatchLater(video,setErrorToast)}><i className="fa fa-trash"></i></button>
                     </div>
                  </div>
                ))
            }
            </div>
        </div>
    )
}

export default WatchLater;

