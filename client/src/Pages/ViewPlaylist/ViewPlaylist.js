import React,{useEffect} from 'react';
import ReactPlayer from 'react-player';
import { Link,useParams } from 'react-router-dom';

import { useVideos } from '../../contexts/VideosContextProvider';

const ViewPlaylist = () => {

    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])

    const {playlists,removeVideoFromPlaylist} = useVideos();
    const {playlistID} = useParams();

    const {videos,name} = playlists.find( list => list._id === playlistID);
 
    return (
        <div className="seeAllVideos__container">
            <h2 className="seeAllVideos__container__header">{name}</h2>
            <div className="cards">
            {
                videos.map( video => (
                  <div key={video._id}>
                  <Link to={`/watch/${video._id}`} state={{type:"All videos",videos}} className="thumbnail__link">
                    <ReactPlayer width="100%" height="180px" playIcon={<i className="fas fa-play-circle"></i>} url={video.url} light={true}/>
                  </Link>
                     <div className="d-flex justify-content-space-between">
                       <div>
                          <h4>{video.title}</h4>
                          <small>Released date : {video.releasedDate}</small>
                       </div>
                       <button className="delete__btn" onClick={() => removeVideoFromPlaylist(video._id,playlistID)} title="Remove"><i className="fa fa-trash"></i></button>
                     </div>
                  </div>
                ))
            }
            </div>
        </div>
    )
}

export default ViewPlaylist;

