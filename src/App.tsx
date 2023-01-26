import React, { FC, Suspense, useEffect, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "./redux/store";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBar from "./components/NavBar/NavBar";
import { Login } from "./components/Login/Login";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";
import "./App.css";
import Grid from "@mui/material/Unstable_Grid2";

// LAZY LOADING
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const UsersContainer = React.lazy(
  () => import("./components/Users/UsersContainer")
);
const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const ChatPage = React.lazy(() => import("./components/ChatPage/ChatPage"));

const App = () => {
    const initialized = useSelector(
      (state: AppStateType) => state.app.initialized
    );
    const dispatch = useDispatch<AppDispatch>();

    useLayoutEffect(() => {
        dispatch(initializeApp());
    }, []);

    if (!initialized) {
        return <Preloader />;
    }

    return (
      <div className="app-wrapper">
          <Grid container spacing={1}>
              <Grid xs={12} md={12} xl={12}>
                  <HeaderContainer />
              </Grid>
              <Grid xs={2} md={2} xl={2}>
                  <NavBar />
              </Grid>

              <Grid xs={10} md={10} xl={10}>
                  <div className="app-wrapper-content">
                      <Suspense fallback={<Preloader />}>
                          <Routes>
                              <Route
                                // exact
                                path="/"
                                element={<Navigate to="profile" />}
                              />
                              <Route path="profile">
                                  <Route
                                    path=":userId"
                                    element={<ProfileContainer />}
                                  />
                                  <Route
                                    path=""
                                    element={<ProfileContainer />}
                                  />
                              </Route>
                              <Route
                                path="dialogs"
                                element={<DialogsContainer />}
                              />
                              <Route
                                path="users"
                                element={<UsersContainer />}
                              />
                              <Route path="news" element={<News />} />
                              <Route path="music" element={<Music />} />
                              <Route path="settings" element={<Settings />} />
                              <Route path="login" element={<Login />} />
                              <Route path="chat" element={<ChatPage />} />
                              <Route
                                path="*"
                                element={<div>404 PAGE NOT FOUND</div>}
                              />
                          </Routes>
                      </Suspense>
                  </div>
              </Grid>
          </Grid>
      </div>
    );
};

export default App;