import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import store from "./redux/store-redux";

import HeaderContainer from "./components/Header/HeaderContainer";
import NavBar from "./components/NavBar/NavBar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainerConnect from "./components/Dialogs/DialogsContainerConnect";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import UsersContainer from "./components/Users/UsersContainer";

import { initializeApp } from "./redux/app-reducer";
import Preloader from "./common/preloader/Preloader";
import "./App.css";

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
                    <Routes>
                        <Route path="profile">
                            <Route
                                path=":userId"
                                element={<ProfileContainer />}
                            />
                            <Route path="" element={<ProfileContainer />} />
                        </Route>
                        <Route
                            path="dialogs"
                            element={<DialogsContainerConnect />}
                        />
                        <Route path="users" element={<UsersContainer />} />
                        <Route path="news" element={<News />} />
                        <Route path="music" element={<Music />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose(connect(mapStateToProps, { initializeApp })(App));

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
