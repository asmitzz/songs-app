import React,{useEffect} from 'react';

import { useParams,useLocation } from 'react-router';

import { useVideos } from '../contexts/VideosContextProvider';

const SeeAllVideosPage = () => {

    useEffect( () => {
        window.scroll(0,0)
    },[])

    const {state} = useVideos();
    const {type} = useParams();
    
    const title = useLocation().state.title;

    const videos = state.allVideos[type];

    return (
        <div className="seeAllVideos__container">
            <h2 className="seeAllVideos__container__header">{title}</h2>
            <div className="cards">
            {
                videos.map( video => (
                    <div className="card" key={video.id}>
                        <iframe height="70%" width="100%" src={video.url} title={video.title}/>
                        <h4>{video.title}</h4>
                        <small>Released date : {video.releasedDate}</small>
                        <div className="card__footer">
                         <button className="primary-btn"><i className="fas fa-clock" aria-hidden="true"></i> Watch Later</button>
                         <button className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> Add to playlist</button>
                       </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default SeeAllVideosPage;
