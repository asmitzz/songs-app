import {NavLink} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const Header = () => {
    const {isUserloggedIn,signout} = useAuth()
;    return (
        <div className="header">
            <NavLink className="header__link logo__name" to="/">
                <span style={{color:"#aaaaa0"}}>Hot</span><span style={{color:"#f7b42c"}}>Music</span>
            </NavLink>
            { !isUserloggedIn ? <NavLink className="header__link" to="/login"><i className="fa fa-user"></i> LOGIN/SIGNUP</NavLink> : <button className="signout__btn" onClick={signout}>Signout <i className="fa fa-sign-out"></i></button>}
        </div>
    )
}

export default Header;
