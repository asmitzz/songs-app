import React, { useEffect } from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';
import { useVideos } from '../contexts/VideosContextProvider';
import VideosSwiper from './VideosSwiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LandingPage = ({history}) => {

    useEffect( () => {
        window.scroll({top:0, behavior:'smooth'})
    },[])

    const {state} = useVideos();

    const { trending,Bollywood,EnglishTopSongs,Hindi90s,Hindi2000s } = state.allVideos;
  
    return (
        <div className="landing__page__container">

          <VideosSwiper title="Trending Songs" pathname="/videos/trending" videosArray={trending} history={history}/>
          <VideosSwiper title="Bollywood Masala" pathname="/videos/Bollywood" videosArray={Bollywood} history={history}/>
          <VideosSwiper title="English Top Songs" pathname="/videos/EnglishTopSongs" videosArray={EnglishTopSongs} history={history}/>
          <VideosSwiper title="Hindi 90s" pathname="/videos/Hindi90s" videosArray={Hindi90s} history={history}/>
          <VideosSwiper title="Hindi 2000s" pathname="/videos/Hindi2000s" videosArray={Hindi2000s} history={history}/>

        </div>
    )
}

export default LandingPage;
