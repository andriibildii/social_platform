const SEND_MESSAGE = "SEND_MESSAGE";

type DialogsType = {
    id: number;
    name: string;
};

type MessagesType = {
    id: number;
    message: string;
};

const initialState = {
    dialogs: [
        { id: 1, name: "Hlib" },
        { id: 2, name: "Andrii" },
        { id: 3, name: "Slava" },
        { id: 4, name: "Mykyta" },
    ] as Array<DialogsType>,
    messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Heey" },
        { id: 3, message: "Wasap" },
        { id: 4, message: "Phhhhhhh" },
    ] as Array<MessagesType>,
};

type initialStateType = typeof initialState;

type ActionsTypes = SendMessageCreatorType;
const dialogsReducer = (
    state = initialState,
    action: ActionsTypes
): initialStateType => {
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

type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE;
    newMessageBody: string;
};
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({
    type: SEND_MESSAGE,
    newMessageBody,
});

export default dialogsReducer;
