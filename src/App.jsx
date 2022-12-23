import { Routes, Route } from "react-router-dom";

import HeaderContainer from "./components/Header/HeaderContainer";
import NavBar from "./components/NavBar/NavBar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainerConnect from "./components/Dialogs/DialogsContainerConnect";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import UsersContainer from "./components/Users/UsersContainer";
import "./App.css";

function App() {
    return (
        <div className="app-wrapper">
            <HeaderContainer />
            <NavBar />
            <div className="app-wrapper-content">
                <Routes>
                    <Route path="profile">
                        <Route path=":userId" element={<ProfileContainer />} />
                        <Route path="" element={<ProfileContainer />} />
                    </Route>
                    {/*<Route path="profile/" element={<ProfileContainer />} />*/}
                    {/*<Route*/}
                    {/*    path="profile/:userId"*/}
                    {/*    element={<ProfileContainer />}*/}
                    {/*/>*/}
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

export default App;
