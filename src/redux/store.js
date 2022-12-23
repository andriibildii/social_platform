// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";
//
// let store = {
// 	_state: {
// 		profilePage: {
// 			posts: [
// 				{ id: 1, message: "Hello mates!", likesCount: 0 },
// 				{ id: 2, message: "The first", likesCount: 23 },
// 				{ id: 3, message: "OMG! It's so late", likesCount: 5 },
// 			],
// 			newPostText: 'add new post...'
// 		},
// 		dialogPage: {
// 			dialogs: [
// 				{ id: 1, name: "Hlib" },
// 				{ id: 2, name: "Andrii" },
// 				{ id: 3, name: "Slava" },
// 				{ id: 4, name: "Mykyta" },
// 			],
// 			messages: [
// 				{ id: 1, message: "Hello" },
// 				{ id: 2, message: "Heey" },
// 				{ id: 3, message: "Wasap" },
// 				{ id: 4, message: "Phhhhhhh" },
// 			],
// 			newMessageBody: 'add new message...'
// 		},
// 		sidebar: {},
// 	},
// 	_callSubscriber() {
// 		console.log("State changed")
// 	},
//
// 	getState() {
// 		return this._state;
// 	},
//
// 	subscribe(observer) {
// 		this._callSubscriber = observer;
// 	},
//
// 	dispatch(action) {
// 		this._state.profilePage = profileReducer(this._state.profilePage, action);
// 		this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
// 		this._state.sidebar = sidebarReducer(this._state.sidebar, action);
//
// 		this._callSubscriber(this._state);
// 	},
// };
//
// export default store;
