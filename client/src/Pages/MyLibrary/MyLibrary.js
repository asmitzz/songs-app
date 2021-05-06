import React from "react";

import { useNavigate } from "react-router-dom";
import {useVideos} from "../../contexts/VideosContextProvider";
import "./MyLibrary.css";

const MyLibrary = () => {
    const navigate = useNavigate();
    const {userDetails,watchLater,history,playlists} = useVideos();

    return (
        <div className="mylibrary__container">
              <div className="mylibrary__header"><button onClick={() => navigate(-1)} className="header__button"><i className="fa fa-arrow-left"></i></button></div>
              <div className="profile">
                    <img className="profile__avatar" width="100px" height="100px" src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="avatar"/>
                    <h4 className="profile__avatar__name">{userDetails?.name}</h4>
                    <button className="edit__btn">EDIT PROFILE</button>
              </div>
              <div className="playlist__and__watchlater">
                  <div className="section">
                      <small>{playlists?.length}</small>
                      <button className="playlist__btn" onClick={() => navigate("/playlist")}>PLAYLISTS</button>
                  </div>
                  <div className="section">
                      <small>{watchLater?.length}</small>
                      <button className="watch__later__btn" onClick={() => navigate("/watchlater")}>WATCH LATER</button>
                  </div>
                  <div className="section">
                      <small>{history?.length}</small>
                      <button className="watch__later__btn" onClick={() => navigate("/history")}>RECENTS</button>
                  </div>
              </div>
        </div>
    );
};

export default MyLibrary;
