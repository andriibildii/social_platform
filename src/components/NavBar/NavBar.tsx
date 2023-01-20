import { FC } from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const NavBar: FC = () => {
    return (
        <nav className={style.nav}>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <List className={style.item}>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink
                        to="/dialogs"
                        className={({ isActive }) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Messages" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink
                        to="/news"
                        className={({ isActive }) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="News" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink
                        to="music"
                        className={({ isActive }) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Music" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive ? style.active : undefined
                        }
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </Box>
        </nav>
    );
};

export default NavBar;
