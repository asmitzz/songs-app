import {NavLink} from "react-router-dom";
import Logo from "../assets/logo1.png"

const Header = () => {
    return (
        <div className="header">
            <NavLink className="header__link logo__name" to="/">
                <img src={Logo} width="100px" height="50px" alt="logo"/>
                HotMusic
            </NavLink>
        </div>
    )
}

export default Header;
