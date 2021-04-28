import React,{useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';

import { useVideos } from '../../contexts/VideosContextProvider';

const ViewPlaylist = () => {

    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])

    const {userPlaylists,removeVideoFromPlaylist} = useVideos();
    const {playlistID} = useParams();

    const {videos,name} = userPlaylists.find( list => list.id === playlistID);
 
    return (
        <div className="seeAllVideos__container">
            <h2 className="seeAllVideos__container__header">{name}</h2>
            <div className="cards">
            {
                videos.map( video => (
                  <div key={video.id}>
                  <Link to={`/watch/${video.id}`} state={{type:"All videos",videos}} className="thumbnail__link">
                    <img width="100%" height="180px" src={video.thumbnail} alt="thumbnail"/>
                  </Link>
                     <div className="d-flex justify-content-space-between">
                       <div>
                          <h4>{video.title}</h4>
                          <small>Released date : {video.releasedDate}</small>
                       </div>
                       <button className="delete__btn" onClick={() => removeVideoFromPlaylist(video.id,playlistID)} title="Remove"><i className="fa fa-trash"></i></button>
                     </div>
                  </div>
                ))
            }
            </div>
        </div>
    )
}

export default ViewPlaylist;

