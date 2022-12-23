import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// let rerenderEntireTree = (store) => {
// 	const root = ReactDOM.createRoot(document.getElementById("root"));
// 	root.render(
// 		<React.StrictMode>
// 			<BrowserRouter>
// 				<App store={store} />
// 			</BrowserRouter>
// 		</React.StrictMode>
// 	);
// };

// rerenderEntireTree(store.getState());
// store.subscribe(rerenderEntireTree);

/// redux - for subscribe to store changes
// store.subscribe(() => {
// 	let state = store.getState();
// 	rerenderEntireTree(state);
// });
