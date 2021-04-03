import React, { useEffect } from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';
import { useVideos } from '../contexts/VideosContextProvider';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LandingPage = ({history}) => {

    useEffect( () => {
        window.scroll(0,0)
    },[])

    const {state} = useVideos();

    const { trending,Bollywood,EnglishTopSongs,Hindi90s,Hindi2000s } = state.allVideos;
  
    return (
        <div className="landing__page__container">

        <div  className="landing__page__headings">
          <h2>Trending songs</h2>
          <button className="seeall__btn" 
          onClick={() => history.push('/videos/trending',{title:"Trending songs"})}>see all</button>
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
                 trending.map( video => (
                 <SwiperSlide key={video.id} >
                       <iframe title="youtube media player" width="100%" height="100%" src={video.url} />
                       <h4>{video.title}</h4>
                       <small>Released date : {video.releasedDate}</small>
                       <div className="card__footer">
                         <button className="primary-btn"><i className="fas fa-clock" aria-hidden="true"></i> Watch Later</button>
                         <button className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> Add to playlist</button>
                       </div>
                  </SwiperSlide>
                 ))
              }
         </Swiper>

         <div  className="landing__page__headings">
          <h2>Bollywood Romance</h2>
          <button className="seeall__btn" onClick={() => history.push('/videos/Bollywood',{title:"Bollywood Romance"})}>see all</button>
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
                 Bollywood.map( video => (
                 <SwiperSlide key={video.id} >
                    <div className="card">
                       <iframe title="youtube media player" width="100%" height="70%" src={video.url} />
                       <h4>{video.title}</h4>
                       <small>Released date : {video.releasedDate}</small>
                       <div className="card__footer">
                         <button className="primary-btn"><i className="fas fa-clock" aria-hidden="true"></i> Watch Later</button>
                         <button className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> Add to playlist</button>
                       </div>
                    </div>
                  </SwiperSlide>
                 ))
              }
         </Swiper>

         <div  className="landing__page__headings">
          <h2>English Top Songs</h2>
          <button className="seeall__btn" onClick={() => history.push('/videos/EnglishTopSongs',{title:"English Top Songs"})}>see all</button>
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
                 EnglishTopSongs.map( video => (
                 <SwiperSlide key={video.id} >
                    <div className="card">
                       <iframe title="youtube media player" width="100%" height="70%" src={video.url} />
                       <h4>{video.title}</h4>
                       <small>Released date : {video.releasedDate}</small>
                       <div className="card__footer">
                         <button className="primary-btn"><i className="fas fa-clock" aria-hidden="true"></i> Watch Later</button>
                         <button className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> Add to playlist</button>
                       </div>
                    </div>
                  </SwiperSlide>
                 ))
              }
         </Swiper>

         <div  className="landing__page__headings">
          <h2>Hindi 90s</h2>
          <button className="seeall__btn" onClick={() => history.push('/videos/Hindi90s',{title:"Hindi 90s"})}>see all</button>
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
                 Hindi90s.map( video => (
                 <SwiperSlide key={video.id} >
                    <div className="card">
                       <iframe title="youtube media player" width="100%" height="70%" src={video.url} />
                       <h4>{video.title}</h4>
                       <small>Released date : {video.releasedDate}</small>
                       <div className="card__footer">
                         <button className="primary-btn"><i className="fas fa-clock" aria-hidden="true"></i> Watch Later</button>
                         <button className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> Add to playlist</button>
                       </div>
                    </div>
                  </SwiperSlide>
                 ))
              }
         </Swiper>

         <div  className="landing__page__headings">
          <h2>Hindi 2000s</h2>
          <button className="seeall__btn" onClick={() => history.push('/videos/Hindi2000s',{title:"Hindi 2000s"})}>see all</button>
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
                 Hindi2000s.map( video => (
                 <SwiperSlide key={video.id} >
                    <div className="card">
                       <iframe title="youtube media player" width="100%" height="70%" src={video.url} />
                       <h4>{video.title}</h4>
                       <small>Released date : {video.releasedDate}</small>
                       <div className="card__footer">
                         <button className="primary-btn"><i className="fas fa-clock" aria-hidden="true"></i> Watch Later</button>
                         <button className="secondary-btn"><i className="fa fa-music" aria-hidden="true"></i> Add to playlist</button>
                       </div>
                    </div>
                  </SwiperSlide>
                 ))
              }
         </Swiper>

         
        </div>
    )
}

export default LandingPage;
