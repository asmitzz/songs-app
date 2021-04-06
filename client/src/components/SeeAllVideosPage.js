import React,{useEffect} from 'react';

import { useParams,useLocation } from 'react-router';
import ReactPlayer from "react-player";

import { useVideos } from '../contexts/VideosContextProvider';

const SeeAllVideosPage = () => {

    useEffect( () => {
        window.scroll(0,0)
    },[])

    const {state,dispatch} = useVideos();
    const {type,id} = useParams();
    
    const title = useLocation().state.title;
    const {watchLater,playlist,selectedPlaylist} = state;


    const getVideos = () => {
        if( type === "playlist" ){
           const findPlaylist = state.playlist.find( list => list.id === id );
           return findPlaylist.playlist;
        }
        return state[type];
    }

    const videos = getVideos();

    const AddToWatchLater = (video) => {
        const findVideo = watchLater.find( v => v.id === video.id);
        if( findVideo ) return dispatch({type:"REMOVE_FROM_WATCH_LATER",payload:video.id});
  
        return dispatch({type:"ADD_TO_WATCH_LATER",payload:video});
    }

    const RemoveFromPlaylist = (videoId) => {
        dispatch({type:"REMOVE_FROM_PLAYLIST",payload:videoId,playlist:id});
        dispatch({type:"CURRENT_PLAYLIST",payload:"none"});
    }

    const AddToPlaylist = (video) => {
        if(selectedPlaylist === null) return;
        dispatch({type:"ADD_TO_PLAYLIST",payload:video,playlist:selectedPlaylist.id});
        dispatch({type:"CURRENT_PLAYLIST",payload:"none"});
     }

     const addToHistory = (video) => {
      const checkvideo = state.history.find((v) => v.id === video.id);
      if (checkvideo) return;
      dispatch({ type: "ADD_TO_HISTORY", payload: video });
    };

    const checkInPL = (id) => {
        if(selectedPlaylist && selectedPlaylist.playlist.find( v => v.id === id)){
          return true;
        }
     }

    return (
        <div className="seeAllVideos__container">
            <h2 className="seeAllVideos__container__header">{title}</h2>
            <div className="cards">
            {
                videos.map( video => (
                    <div className="card" key={video.id}>
                        <ReactPlayer url={video.url} onPlay={() => addToHistory(video)} width="100%" height="100%"/>
                        <h4>{video.title}</h4>
                        <small>Released date : {video.releasedDate}</small>
                        <div className="card__footer">
                        <button className="primary-btn" onClick={() => AddToWatchLater(video)}><i className="fas fa-clock" aria-hidden="true"></i>
                           {watchLater.find( v => v.id === video.id) ? " Remove from watchlist" : " Watch later"}
                         </button>
                         
                         { type !== "playlist" && <div>
                         <button className="secondary-btn" disabled={checkInPL(video.id)} onClick={() => AddToPlaylist(video) }>
                           <i className="fa fa-music" aria-hidden="true"></i> {checkInPL(video.id) ? "Added to" : "Add to"}
                        </button>

                          <select className="playlist__selector primary-btn" value={selectedPlaylist ? selectedPlaylist.id : "none"} onChange={(e) => dispatch({type:"CURRENT_PLAYLIST",payload:e.target.value})}>
                            <option value="none">none</option>
                            {
                              playlist.map( list => (
                                <option key={list.id} value={list.id}>{list.name}</option>
                              ))
                            }
                         </select>
                         </div>}

                         { type === "playlist" && <button onClick={ () => RemoveFromPlaylist(video.id) } className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> { type === "playlist" ? "Remove from playlist" :"Add to playlist"}</button>}
                       </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default SeeAllVideosPage;
