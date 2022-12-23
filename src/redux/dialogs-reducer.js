const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
    dialogs: [
        { id: 1, name: "Hlib" },
        { id: 2, name: "Andrii" },
        { id: 3, name: "Slava" },
        { id: 4, name: "Mykyta" },
    ],
    messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Heey" },
        { id: 3, message: "Wasap" },
        { id: 4, message: "Phhhhhhh" },
    ],
    newMessageBody: "",
};

const dialogsReducer = (state = initialState, action) => {
    // console.log(state);
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body,
            };

        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: "",
                messages: [
                    ...state.messages,
                    {
                        id: state.messages[state.messages.length - 1].id + 1,
                        message: body,
                    },
                ],
            };
        default:
            return state;
    }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body,
});

export default dialogsReducer;
