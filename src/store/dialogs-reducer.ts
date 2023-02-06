import { InferActionsTypes } from "./store";

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

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const dialogsReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "social-platform/dialogs-reducer/SEND_MESSAGE":
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

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({ type: "social-platform/dialogs-reducer/SEND_MESSAGE", newMessageBody} as const)
}

export default dialogsReducer;
