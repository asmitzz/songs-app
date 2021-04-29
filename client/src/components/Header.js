import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <NavLink className="header__link logo__name" to="/">
                <img src="https://library.kissclipart.com/20191120/yaq/kissclipart-flame-fire-logo-symbol-29a96d414d502463.png" width="100px" height="50px" alt="logo"/>
                HotMusic
            </NavLink>
        </div>
    )
}

export default Header;
