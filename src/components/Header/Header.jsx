import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import style from "./Header.module.css";

const Header = (props) => {
    return (
        <header className={style.header}>
            <Card sx={{ minHeight: 50, display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2 }}>

                    <img
                        src="https://images.rawpixel.com/image_png_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zNzNiYXRjaDQtNjIucG5n.png"
                        alt="logo"
                    />
                    <div className={style.loginBlock}>
                        {props.isAuth ? (
                            <div>
                                <Button size="small">{props.login}</Button>
                                <Button size="small" variant="contained" onClick={props.logoutThunkCreator}>
                                    Log out
                                </Button>
                            </div>
                        ) : (
                            <NavLink to={"/login"}><Button size="small" variant="contained" color="success">
                                Login
                            </Button></NavLink>
                        )}
                    </div>

            </Card>
        </header>
    );
};

export default Header;
