import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/bundle";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
import { Link,useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

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
          <SwiperSlide key={video._id} className="thumbnail">
               <Link to={`/watch/${video._id}`} state={{videos}} className="thumbnail__link">
                  <div>
                    <ReactPlayer width="280px" playIcon={<i className="fas fa-play-circle"></i>} height="150px" url={video.url} light={true}/>
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
