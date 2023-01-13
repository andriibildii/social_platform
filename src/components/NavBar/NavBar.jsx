import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <Card sx={{ minHeight: 796 }}>
                <CardContent>
                    <div className={style.item}>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? style.active : undefined
                            }
                        >
                            Profile
                        </NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink
                            to="/dialogs"
                            className={({ isActive }) =>
                                isActive ? style.active : undefined
                            }
                        >
                            Messages
                        </NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                isActive ? style.active : undefined
                            }
                        >
                            Users
                        </NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink
                            to="/news"
                            className={({ isActive }) =>
                                isActive ? style.active : undefined
                            }
                        >
                            News
                        </NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink
                            to="music"
                            className={({ isActive }) =>
                                isActive ? style.active : undefined
                            }
                        >
                            Music
                        </NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive ? style.active : undefined
                            }
                        >
                            Settings
                        </NavLink>
                    </div>
                </CardContent>
            </Card>
        </nav>
    );
};

export default NavBar;
