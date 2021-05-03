import React, { useEffect } from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';
import VideosSwiper from '../../components/VideosSwiper';
import Header from '../../components/Header';
import Spinner from '../../utils/Spinner';
import { useVideos } from '../../contexts/VideosContextProvider';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LandingPage = () => {

    const {videosByCategory} = useVideos(); 

    useEffect( () => {
        window.scroll({top:0, behavior:'smooth'})
    },[])

    return (
      <div>
          <Header/>
          <div className="landing__page__container">
              {
                videosByCategory.length > 0 ? videosByCategory.map( cat => (
                  <VideosSwiper key={cat._id} category={cat}/>
                )) : <Spinner style={{top:"11.1%",paddingBottom:"8rem"}} show={true}/>
              }
          </div>
      </div>
        
    )
}

export default LandingPage;
