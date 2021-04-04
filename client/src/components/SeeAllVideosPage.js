import React,{useEffect} from 'react';

import { useParams,useLocation } from 'react-router';

import { useVideos } from '../contexts/VideosContextProvider';

const SeeAllVideosPage = () => {

    useEffect( () => {
        window.scroll(0,0)
    },[])

    const {state,dispatch} = useVideos();
    const {type,id} = useParams();
    
    const title = useLocation().state.title;
    const {watchLater} = state.allVideos;


    const getVideos = () => {
        if( type === "playlist" ){
           const findPlaylist = state.playlist.find( list => list.id === id );
           return findPlaylist.playlist;
        }
        return state.allVideos[type];
    }

    const videos = getVideos();

    const AddToWatchLater = (video) => {
        const findVideo = watchLater.find( v => v.id === video.id);
        if( findVideo ) return dispatch({type:"REMOVE_FROM_WATCH_LATER",payload:video.id});
  
        return dispatch({type:"ADD_TO_WATCH_LATER",payload:video});
    }

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
                        <button className="primary-btn" onClick={() => AddToWatchLater(video)}><i className="fas fa-clock" aria-hidden="true"></i>
                           {watchLater.find( v => v.id === video.id) ? " Remove from watchlist" : " Watch later"}
                         </button>
                         <button onClick={ () => dispatch({type:"REMOVE_FROM_PLAYLIST",payload:video.id}) } className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> { type === "playlist" ? "Remove from playlist" :"Add to playlist"}</button>
                       </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default SeeAllVideosPage;
