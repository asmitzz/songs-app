import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';
import { useVideos } from '../contexts/VideosContextProvider';

const VideosSwiper = ({title,pathname,videosArray,history}) => {

  const {state,dispatch} = useVideos();

  const {playlist,selectedPlaylist,watchLater} = state;

  const AddToWatchLater = (video) => {
      const findVideo = watchLater.find( v => v.id === video.id);
      if( findVideo ) return dispatch({type:"REMOVE_FROM_WATCH_LATER",payload:video.id});

      return dispatch({type:"ADD_TO_WATCH_LATER",payload:video});
  }

  const AddToPlaylist = (video) => {
     if(selectedPlaylist === null) return;
     dispatch({type:"ADD_TO_PLAYLIST",payload:video,playlist:selectedPlaylist.id});
     dispatch({type:"CURRENT_PLAYLIST",payload:selectedPlaylist.id});
  }

  const checkInPL = (id) => {
     if(selectedPlaylist && selectedPlaylist.playlist.find( v => v.id === id)){
       return true;
     }
  }

    return (
        <div>
            <div className="landing__page__headings">
               <h2>{title}</h2>
               <button className="seeall__btn" onClick={() => history.push(pathname,{title})}>see all</button>
            </div>

            <Swiper
              spaceBetween={10}
              breakpoints={{
              300 : {
                width: 300,
                slidesPerView: 1,
              },
            
              768: {
                width: 768,
                slidesPerView: 2.5,
              },
             }}
             navigation
            >
              {
                 videosArray.map( video => (
                 <SwiperSlide key={video.id} >
                       <iframe title="youtube media player" width="100%" height="100%" src={video.url} />
                       <h4>{video.title}</h4>
                       <small>Released date : {video.releasedDate}</small>
                       <div className="card__footer">
                         <button className="primary-btn" onClick={() => AddToWatchLater(video)}><i className="fas fa-clock" aria-hidden="true"></i>
                           {watchLater.find( v => v.id === video.id) ? " Remove from watchlist" : " Watch later"}
                         </button>
                         
                         <div>
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
                         </div>
                       </div>
                  </SwiperSlide>
                 ))
              }
         </Swiper>
        </div>
    );
};

export default VideosSwiper;
