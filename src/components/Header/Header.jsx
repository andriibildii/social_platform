import style from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <img
                src="https://images.rawpixel.com/image_png_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zNzNiYXRjaDQtNjIucG5n.png"
                alt="logo"
            />
            <div className={style.loginBlock}>
                {props.isAuth ? (
                    <div>{props.login} - <button onClick={props.logoutThunkCreator} >Log out</button></div>
                ) : (
                    <NavLink to={"/login"}>Login</NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
