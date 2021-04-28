import { useState } from "react";
import ReactPlayer from "react-player";
import { Link,useLocation,useParams } from "react-router-dom";
import { useVideos } from "../contexts/VideosContextProvider";
import {nanoid} from 'nanoid';
import Backdrop from "../utils/Backdrop/Backdrop";

const WatchVideo = () => {
    const {videoID} = useParams();
    const videos = useLocation()?.state?.videos;
    const video = videos?.find(v => v.id === videoID);

    const [showPlaylist, setShowPlaylist] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [createPlaylistBtn, setCreatePlaylistBtn] = useState(false);
    const [err,setErr] = useState("");

    const {userPlaylists,watchLater,handleWatchLater,addToHistory,addVideoToPlaylist,dispatch} = useVideos();

    const createPlaylist = (e) => {
      e.preventDefault();

      if(playlistName !== "") {
          dispatch({type:"CREATE_PLAYLIST",payload:{id:nanoid(),name:playlistName,videos:[]}});
          setPlaylistName("");
          setCreatePlaylistBtn(false);
      }
      else{
        setErr("Please enter valid name");
      }
     }

    return video ? (
        <div className="watch__video__container">

           <section className="left__section">
              <div className="video__card">
                 <div className="video__player">
                 <ReactPlayer width="100%" height="100%" playing={true} url={video.url} controls={true} onPlay={()=>addToHistory(video)}/>
                 </div>
                 <h4 className="video__title">{video.title}</h4>
                 <div className="video__card__footer">
                     <div className="video__card__footer__left">
                       <small>{video.views}&nbsp;views • {video.releasedDate}</small>
                     </div>
                     <div className="video__card__footer__right">
                       <button className="video__card__footer__button"><i className="fa fa-thumbs-up"></i>&nbsp;{video.like}</button>
                       <button className="video__card__footer__button"><i className="fa fa-thumbs-down"></i>&nbsp;{video.dislike}</button>
                       <button onClick={() => setShowPlaylist(true)} className="video__card__footer__button"><i className="fa fa-music"></i>&nbsp;SAVE</button>
                     </div>
                 </div>
              </div>
           </section>

            <section className="right__section">
               <h3 className="right__section__heading">Related Videos</h3>
                { 
                    videos.map( video => video.id !== videoID ?(
                        <Link key={video.id} to={{pathname:`/watch/${video.id}`}} state={{type:"Related videos",videos}} className="thumbnail__link">
                           <div className="video__card">
                             <img src={video.thumbnail} className="video__thumbnail" alt="thumbnail"/>
                             <div className="video__card__content">
                              <h5>{video.title}</h5>
                               <br/>
                               <small>{video.views}&nbsp;views • {video.releasedDate}</small>
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
                          <input type="checkbox" defaultChecked={watchLater.find(v => v.id === videoID)} onChange={() => handleWatchLater(video)} style={{cursor:"pointer"}}/>
                          <label><small>Watch later</small></label>
                       </div>

                       {userPlaylists.map( (list,index) => (
                         <div className="modal__content__item" key={list.id}>
                           <input type="checkbox" defaultChecked={list.videos.find(v => v.id === videoID)} onChange={() => addVideoToPlaylist(video,list.id,index)} style={{cursor:"pointer"}}/>
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
                        <form onSubmit={createPlaylist}>
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

export default WatchVideo;
