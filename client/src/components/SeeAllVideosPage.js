import React,{useEffect} from 'react';
import ReactPlayer from 'react-player';

import { useParams } from "react-router-dom";
import { useVideos } from "../contexts/VideosContextProvider";

import { Link } from 'react-router-dom';

const SeeAllVideosPage = () => {

    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])
   
    const {videosByCategory} = useVideos();
    const {categoryID} = useParams();

    const category = videosByCategory.find(cat => cat._id === categoryID) || {name:"",videos:[]};
    const videos = category.videos;
    
    return (
        <div className="seeAllVideos__container">
            <h2 className="seeAllVideos__container__header">{category.name}</h2>
            <div className="cards">
            {
                videos.map( video => (
                  <Link to={`/watch/${video._id}`} key={video._id} className="thumbnail__link">
                  <div>
                    <ReactPlayer width="100%" height="180px" playIcon={<i className="fas fa-play-circle"></i>} url={video.url} light={true}/>
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
