import React,{useEffect} from 'react';

import { useLocation, useParams } from "react-router-dom";

import { Link } from 'react-router-dom';

const SeeAllVideosPage = () => {

    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])

    const {type} = useParams();
    const location = useLocation();
    const videos = location?.state?.videos;

    return (
        <div className="seeAllVideos__container">
            <h2 className="seeAllVideos__container__header">{type}</h2>
            <div className="cards">
            {
                videos.map( video => (
                  <Link to={`/watch/${video.id}`} key={video.id} state={{videos}} className="thumbnail__link">
                  <div>
                    <img width="100%" height="100%" src={video.thumbnail} alt="thumbnail"/>
                    <h4>{video.title}</h4>
                    <small>Released date : {video.releasedDate}</small>
                  </div>
               </Link>
                ))
            }
            </div>
        </div>
    )
}

export default SeeAllVideosPage;
