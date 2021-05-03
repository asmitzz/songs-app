import React, { useState } from "react";
import { useVideos } from "../../contexts/VideosContextProvider";

import {Link,useNavigate} from 'react-router-dom';

const PlayListPage = () => {

  const [show,setShow] = useState(false);
  const [playlist,setPlaylist] = useState("");
  const [err,setErr] = useState("");
  const navigate = useNavigate();
  const {removePlaylist,createPlaylist,playlists} = useVideos();

  const handleSubmit = (e) => {
   e.preventDefault();

   if(playlist !== "") {
       createPlaylist(playlist);
       setPlaylist("");
       setShow(false);
   }
   else{
    setErr("Please enter valid name");
   }
  }

  return (
    <div className="playlist__container">
        <div className="seeAllVideos__container__header">
               <button onClick={() => navigate(-1)} className="header__button"><i className="fa fa-arrow-left"></i></button>
                <h2>My PlayLists</h2>
        </div>

        <button className="primary-btn create__btn" onClick={() => setShow(true)}>
        <i className="fa fa-plus"></i> Create New Playlist
      </button>
      
        <div className="playlist">
      { 
          playlists.map( item => (
                  <div className="playlist__item" key={item._id}>
                    <i onClick={ () => removePlaylist(item._id) } className="fa fa-trash ml-2 text-danger deleteIcon"></i>
                    <span>{item.name.toUpperCase()}</span>
                    <small>{item.videos.length} Videos</small>
                    <Link className="playlist__item__link" to={{pathname:`/playlist/${item._id}`}}>View Playlist</Link>
                  </div>
         ) )
      }
      </div>

      { show && <div className="modal">
        <div className="modal-dialog">
          <div className="modal-header bg-dark text-light">
            <h5 className="modal-title">Create Playlist</h5>
            <button className="modal-dismiss" onClick={() => setShow(false)}>x</button>
          </div>
          <div className="modal-body bg-dark text-light">
             <form onSubmit={handleSubmit}>
               <label><small>Enter Name :</small> </label>
               <input type="text" className="playlist__input" value={playlist} onChange={ (e) => setPlaylist(e.target.value) }/>
               <span className="invalid-feedback">{err}</span>
             </form>
          </div>
          <div className="modal-footer bg-dark text-light">
            <button className="btn btn-danger" onClick={() => setShow(false)}>Cancel</button>
            <button className="btn btn-success" onClick={handleSubmit}>Ok</button>
          </div>
         </div>
        </div>}

    </div>
  );
};

export default PlayListPage;
