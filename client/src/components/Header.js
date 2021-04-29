import {NavLink} from "react-router-dom";
import Logo from "../assets/logo1.png"

const Header = () => {
    return (
        <div className="header">
            <NavLink className="header__link logo__name" to="/">
                <div className="logo">
                  <img src={Logo} width="100px" className="logo-img" height="42px" alt="logo" />
                </div>
                HotMusic
            </NavLink>
        </div>
    )
}

export default Header;
