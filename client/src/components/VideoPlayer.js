import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link,useLocation,useParams,useNavigate } from "react-router-dom";
import { useVideos } from "../contexts/VideosContextProvider";
import Backdrop from "../utils/Backdrop/Backdrop";
import {useAuth} from "../contexts/AuthContext";
import axios from 'axios';
import Toast from "../utils/Toast";
import "./VideoPlayer.css";

const VideoPlayer = () => {
    const {videoID} = useParams();
    const {playlists,videos,watchLater,handleWatchLater,addToHistory,addVideoToPlaylist,createPlaylist} = useVideos();
    const [errorToast,setErrorToast] = useState(false);

    useEffect( () => {
      window.scroll({top:0, behavior:'smooth'})
      const video = videos.find(v => v._id === videoID)

      if(video){
        setVideo(video)
      }
      else{
        (async function(){
          try {
          const {data} = await axios.get(`https://hotmusic20-21.herokuapp.com/api/videos/${videoID}`);
          setVideo(data.video)
          } catch (error) {
            console.log(error);
          }
        })()
      }

      return () => {
        setVideo({title:"",releasedDate:"",url:"",like:[],dislike:[],views:[]})
      }
    },[videoID,videos])

    const path = useLocation()?.pathname;
    const [video,setVideo] = useState({title:"",releasedDate:"",url:"",like:[],dislike:[],views:[]});

    const [showPlaylist, setShowPlaylist] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [createPlaylistBtn, setCreatePlaylistBtn] = useState(false);
    const [err,setErr] = useState("");

    const {isUserloggedIn,uid} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();

      if(playlistName !== "") {
          createPlaylist(playlistName,setErrorToast);
          setPlaylistName("");
          setCreatePlaylistBtn(false);
      }
      else{
        setErr("Please enter valid name");
      }
     }

     const likeVideo = async(videoID) => {
      if(!isUserloggedIn){
        navigate("/login",{state:{from:path}})
        return;
      }
      try {
        const {status,data} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/videos/like/${uid}/${videoID}`);
        if(status === 200){
          setVideo(data.video)
        }
      } catch (error) {
          console.log(error);
      }
  }

  const dislikeVideo = async(videoID) => {
      if(!isUserloggedIn){
        navigate("/login",{state:{from:path}});
        return;
      }
      try {
        const {status,data} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/videos/dislike/${uid}/${videoID}`);
        if(status === 200){
          setVideo(data.video)
        }
      } catch (error) {
          console.log(error);
      }
  }

  const handleViews = async(videoID) => {
      try {
        const {status,data} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/videos/views/${uid}/${videoID}`);
        if(status === 200){
          setVideo(data.video)
        }
      } catch (error) {
          console.log(error);
      }
  }

  const handleOnPlay = (video) => {
    if(isUserloggedIn){
      addToHistory(video,setErrorToast);
      if(!video.views.find( u => u === uid )){
        handleViews(video._id)
      }
    }
 }

    return video ? (
        <div className="watch__video__container">
            <Toast show={errorToast} error={true} background="red" onClick={() => setErrorToast(false)} color="white" message="Something went wrong with server"/>

           <section className="left__section">
              <div className="video__card">
                 <div className='player-wrapper'>
                   <ReactPlayer width="100%" className='react-player' height="100%" playing={true} url={video.url} controls={true} onPlay={() => handleOnPlay(video)}/>
                 </div>
                 <h4 className="video__title">{video.title}</h4>
                 <div className="video__card__footer">
                     <div className="video__card__footer__left">
                       <small>{video.views.length}&nbsp;views • {video.releasedDate}</small>
                     </div>
                     <div className="video__card__footer__right">
                       <button onClick={() => likeVideo(video._id)} className={ video.like.find( u => u === uid ) ? "video__card__footer__button__active" : "video__card__footer__button" }><i className="fa fa-thumbs-up"></i>&nbsp;{video.like.length}</button>
                       <button onClick={() => dislikeVideo(video._id)} className={ video.dislike.find( u => u === uid ) ? "video__card__footer__button__active" : "video__card__footer__button" }><i className="fa fa-thumbs-down"></i>&nbsp;{video.dislike.length}</button>
                       <button onClick={isUserloggedIn ? () => setShowPlaylist(true) : () => navigate("/login",{state:{from:path}})} className="video__card__footer__button"><i className="fa fa-music"></i>&nbsp;SAVE</button>
                     </div>
                 </div>
              </div>
           </section>

            <section className="right__section">
               <h3 className="right__section__heading">All Videos</h3>
                { 
                    videos.map( video => video._id !== videoID ?(
                        <Link key={video._id} to={`/watch/${video._id}`} className="thumbnail__link">
                           <div className="video__card">
                             <ReactPlayer url={video.url} width="150px" height="90px" playIcon={<i className="fas fa-play-circle"></i>} light={true} alt="thumbnail"/>
                             <div className="video__card__content">
                              <h5>{video.title}</h5>
                               <br/>
                               <small>{video.views.length}&nbsp;views • {video.releasedDate}</small>
                             </div>
                         </div>
                        </Link>
                    ):"")
                }
           </section>

               <Backdrop show={showPlaylist}>
               <div className="modal">
                    <div className="modal__dialog__box">
                    <div className="modal__header">
                        <small>Save to...</small>
                        <button className="modal__dismiss__btn" onClick={() => setShowPlaylist(false)}><i className="fa fa-times"></i></button>
                    </div>
                    <div className="modal__content">
                       <div className="modal__content__item">
                          <input type="checkbox" defaultChecked={watchLater.find(v => v._id === videoID)} onChange={() => handleWatchLater(video,setErrorToast)} style={{cursor:"pointer"}}/>
                          <label><small>Watch later</small></label>
                       </div>

                       {playlists.map( (list,index) => (
                         <div className="modal__content__item" key={list._id}>
                           <input type="checkbox" defaultChecked={list.videos.find(v => v._id === videoID)} onChange={() => addVideoToPlaylist(video._id,list._id,index,setErrorToast)} style={{cursor:"pointer"}}/>
                           <label><small>{list.name}</small></label>
                         </div>
                       ) )}
                    </div>
                    <div className="modal__footer">
                        { 
                        !createPlaylistBtn ? 
                        (
                        <button className="modal__footer__btn" onClick={() => setCreatePlaylistBtn(true)}>
                          <i className="fa fa-plus"></i>
                          <small>&nbsp;&nbsp;Create new playlist</small>
                        </button>
                        ) :
                        (
                        <form onSubmit={handleSubmit}>
                           <label className="form__label">Name</label>
                           <input value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} className="form__control" type="text"/>
                           <small>{err}</small>
                           <button className="form__submit">CREATE</button>
                        </form>
                        )
                        }
                    </div>
                    </div>
               </div>
           </Backdrop>

        </div>
    ) : ("no videos");
};

export default VideoPlayer;
