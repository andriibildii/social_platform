import React, { Suspense } from "react";
import { Routes, Route, Redirect, BrowserRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import store from "./redux/store";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./common/preloader/Preloader";
import "./App.css";

// LAZY LOADING
const ProfileContainer = React.lazy(() =>
    import("./components/Profile/ProfileContainer")
);
const DialogsContainer = React.lazy(() =>
    import("./components/Dialogs/DialogsContainerConnect")
);
const UsersContainer = React.lazy(() =>
    import("./components/Users/UsersContainer")
);
const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <NavBar />
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route exact path="/" element={<Navigate to="profile" />} />
                            <Route path="profile">
                                <Route
                                    path=":userId"
                                    element={<ProfileContainer />}
                                />
                                <Route path="" element={<ProfileContainer />} />
                            </Route>
                            <Route
                                path="dialogs"
                                element={<DialogsContainer />}
                            />
                            <Route path="users" element={<UsersContainer />} />
                            <Route path="news" element={<News />} />
                            <Route path="music" element={<Music />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="login" element={<Login />} />
                            <Route path="*" element={<div>404 PAGE NOT FOUND</div>} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose(connect(mapStateToProps, { initializeApp })(App));

const SocialApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default SocialApp;
