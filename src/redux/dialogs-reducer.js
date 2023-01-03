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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: state.messages[state.messages.length - 1].id + 1,
                        message: action.newMessageBody,
                    },
                ],
            };
        default:
            return state;
    }
};

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;
