import React, { useEffect } from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';
import {VideosData} from "../../VideosData";
import VideosSwiper from '../../components/VideosSwiper';
import Header from '../../components/Header';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const LandingPage = () => {

    useEffect( () => {
        window.scroll({top:0, behavior:'smooth'})
    },[])

    return (
        <div className="landing__page__container">
            <Header/>
            {
              VideosData.map( cat => (
                <VideosSwiper key={cat.id} type={cat.type} videos={cat.videos}/>
              ))
            }

        </div>
    )
}

export default LandingPage;
