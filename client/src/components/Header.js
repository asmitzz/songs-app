import {NavLink} from "react-router-dom";
import Logo from "../assets/logo1.png"

const Header = () => {
    return (
        <div className="header">
            <NavLink className="header__link logo__name" to="/">
                <div className="logo">
                  <img src={Logo} className="logo-img" alt="logo" />
                </div>
                HotMusic
            </NavLink>
            <small>v1.0</small>
        </div>
    )
}

export default Header;
