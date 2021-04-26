import ReactPlayer from "react-player";
import { Link,useLocation,useParams } from "react-router-dom";

const WatchVideo = () => {
    const {videoID} = useParams();

    const videos = useLocation()?.state?.videos;
    const video = videos?.find(v => v.id === videoID);
    
    return video ? (
        <div className="watch__video__container">
           <section className="left__section">
              <div className="video__card">
                 <ReactPlayer url={video.url} className="video__player"/>
                 <h4 className="video__title">{video.title}</h4>
                 <div className="video__card__footer">
                     <div className="video__card__footer__left">
                       <small>{video.views}&nbsp;views • {video.releasedDate}</small>
                     </div>
                     <div className="video__card__footer__right">
                       <button className="video__card__footer__button"><i className="fa fa-thumbs-up"></i>&nbsp;{video.like}</button>
                       <button className="video__card__footer__button"><i className="fa fa-thumbs-down"></i>&nbsp;{video.dislike}</button>
                       <button className="video__card__footer__button"><i className="fa fa-music"></i>&nbsp;SAVE</button>
                     </div>
                 </div>
              </div>
           </section>

           <section className="right__section">
               <h3 className="right__section__heading">Related Videos</h3>
                {
                    videos.map( video => video.id !== videoID ?(
                        <Link key={video.id} to={{pathname:`/watch/${video.id}`}} state={{videos}}className="thumbnail__link">
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
        </div>
    ) : ("no videos");
};

export default WatchVideo;
