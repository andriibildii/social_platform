import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../redux/store";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import style from "./Header.module.css";
import { Avatar } from "@mui/material";
import { logoutThunkCreator } from "../../redux/auth-reducer";

const Header: FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const login = useSelector((state: AppStateType) => state.auth.login);
    const dispatch = useDispatch<AppDispatch>();

    const logout = () => {
        dispatch(logoutThunkCreator());
    };

    return (
        <header className={style.header}>
            <Card
                sx={{
                    minHeight: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 2,
                    paddingRight: 2,
                }}
            >
                <Avatar
                    src="https://images.rawpixel.com/image_png_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zNzNiYXRjaDQtNjIucG5n.png"
                    alt="logo"
                />
                <div className={style.loginBlock}>
                    {isAuth ? (
                        <div>
                            <Button size="small">
                                <Avatar sx={{ width: 24, height: 24 }}></Avatar>
                                {login}
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={logout}
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <NavLink to={"/login"}>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                            >
                                Login
                            </Button>
                        </NavLink>
                    )}
                </div>
            </Card>
        </header>
    );
};

export default Header;
