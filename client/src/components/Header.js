import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <NavLink className="header__link logo__name" to="/">
                <span style={{color:"#aaaaa0"}}>Hot</span><span style={{color:"#f7b42c"}}>Music</span>
            </NavLink>
            <small>v1.0</small>
        </div>
    )
}

export default Header;
