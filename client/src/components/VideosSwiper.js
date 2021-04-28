import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/bundle";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
import { Link,useNavigate } from "react-router-dom";

const VideosSwiper = ({ type, videos }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="landing__page__headings">
        <h2>{type}</h2>
        <button onClick={() => navigate(`/videos/${type}`,{state:{videos}})} className="seeall__btn">SEE ALL</button>
      </div>

      <Swiper
        spaceBetween={0}
        breakpoints={{
          300: {
            width: 300,
            slidesPerView: 1,
          },

          768: {
            width: 768,
            slidesPerView: 2.6,
          },
        }}
        navigation
      >
        { videos.map((video) => (
          <SwiperSlide key={video.id} className="thumbnail">
               <Link to={`/watch/${video.id}`} state={{videos}} className="thumbnail__link">
                  <div>
                    <img width="280px" height="100%" src={video.thumbnail} alt="thumbnail"/>
                    <h4>{video.title}</h4>
                    <small>Released date : {video.releasedDate}</small>
                  </div>
               </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideosSwiper;
