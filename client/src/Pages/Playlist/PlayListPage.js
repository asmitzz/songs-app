import React, { useState } from "react";
import { useVideos } from "../../contexts/VideosContextProvider";
import {nanoid} from 'nanoid';

import {Link} from 'react-router-dom';

const PlayListPage = () => {

  const [show,setShow] = useState(false);
  const [playlist,setPlaylist] = useState("");
  const [err,setErr] = useState("");

  const {dispatch,userPlaylists} = useVideos();

  const createPlaylist = (e) => {
   e.preventDefault();

   if(playlist !== "") {
       dispatch({type:"CREATE_PLAYLIST",payload:{id:nanoid(),name:playlist,videos:[]}});
       setPlaylist("");
       setShow(false);
   }
   else{
    setErr("Please enter valid name");
   }
  }

  return (
    <div className="playlist__container">
        <h2 className="playlist__container__header"><i className="fa fa-music"></i> My Playlist</h2>

        <button className="primary-btn create__btn" onClick={() => setShow(true)}>
        <i className="fa fa-plus"></i> Create New Playlist
      </button>
      
        <div className="playlist">
      { 
          userPlaylists.map( (item,i) => (
                  <div className="playlist__item" key={item.id}>
                    <i onClick={ () => dispatch({type:"REMOVE_PLAYLIST",payload:item.id}) } className="fa fa-trash ml-2 text-danger deleteIcon"></i>
                    <span>{item.name.toUpperCase()}</span>
                    <small>{item.videos.length} Videos</small>
                    <Link className="playlist__item__link" to={{pathname:`/playlist/${item.id}`}} state={{videos:item.videos}}>View Playlist</Link>
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
             <form onSubmit={createPlaylist}>
               <label><small>Enter Name :</small> </label>
               <input type="text" className="playlist__input" value={playlist} onChange={ (e) => setPlaylist(e.target.value) }/>
               <span className="invalid-feedback">{err}</span>
             </form>
          </div>
          <div className="modal-footer bg-dark text-light">
            <button className="btn btn-danger" onClick={() => setShow(false)}>Cancel</button>
            <button className="btn btn-success" onClick={createPlaylist}>Ok</button>
          </div>
         </div>
        </div>}

    </div>
  );
};

export default PlayListPage;
