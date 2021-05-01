import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";

const MyLibrary = () => {
    const navigate = useNavigate();
    const {uid} = useAuth();
    const [userDetails,setUserDetails] = useState(null)

    useEffect(() => {
      (async function(){
        const {data} = await axios.get(`https://hotmusic20-21.herokuapp.com/api/users/${uid}`);
        setUserDetails(data.user);
      })()
    },[uid])

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
                      <small>{userDetails?.playlists.length}</small>
                      <button className="playlist__btn" onClick={() => navigate("/playlist")}>PLAYLISTS</button>
                  </div>
                  <div className="section">
                      <small>{userDetails?.watchLater.length}</small>
                      <button className="watch__later__btn" onClick={() => navigate("/watchlater")}>WATCH LATER</button>
                  </div>
                  <div className="section">
                      <small>{userDetails?.history.length}</small>
                      <button className="watch__later__btn" onClick={() => navigate("/history")}>RECENTS</button>
                  </div>
              </div>
        </div>
    );
};

export default MyLibrary;