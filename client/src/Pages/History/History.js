import React,{useEffect} from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { useVideos } from '../../contexts/VideosContextProvider';

const History = () => {

    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])

    const {history,removeFromHistory} = useVideos();

    return (
        <div className="seeAllVideos__container">
            <h2 className="seeAllVideos__container__header">History</h2>
            <div className="cards">
            {
                history.map( video => (
                  <div key={video.id}>
                  <Link to={`/watch/${video.id}`} state={{type:"All videos",videos:history}} className="thumbnail__link">
                    <ReactPlayer width="100%" height="150px" playIcon={<i className="fas fa-play-circle"></i>} url={video.url} light={true}/>
                  </Link>
                     <div className="d-flex justify-content-space-between">
                       <div>
                          <h4>{video.title}</h4>
                          <small>Released date : {video.releasedDate}</small>
                       </div>
                       <button className="delete__btn" onClick={() => removeFromHistory(video.id)} title="Remove"><i className="fa fa-trash"></i></button>
                     </div>
                  </div>
                ))
            }
            </div>
        </div>
    )
}

export default History;

