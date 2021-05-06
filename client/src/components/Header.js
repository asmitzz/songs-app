import { useState } from "react";
import {NavLink} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import Spinner from "../utils/Spinner";
import "./Header.css";

const Header = () => {
    const {isUserloggedIn,signout} = useAuth();
    const [spinner,setSpinner] = useState(false);

;    return (
        <div className="header">
            <Spinner show={spinner} style={{top:"11.1%",paddingBottom:"8rem"}}/>
            <NavLink className="header__link logo__name" to="/">
                <span style={{color:"#aaaaa0"}}>Hot</span><span style={{color:"#f7b42c"}}>Music</span>
            </NavLink>
            { !isUserloggedIn ? 
            <NavLink className="header__link" to="/login">
                <div className="text-center">
                    <i className="fa fa-user"></i>
                    <small style={{fontSize:"0.8rem"}}>&nbsp;&nbsp;LOGIN</small>
                </div>
            </NavLink> : 
            <button className="signout__btn" onClick={() => signout(setSpinner)}>
                Signout <i className="fa fa-sign-out"></i>
            </button>}
        </div>
    )
}

export default Header;
