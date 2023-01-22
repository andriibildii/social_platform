import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api";
import { BaseThunkType, InferActionsTypes } from "./store";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { chatAPI, ChatMessageType } from "../api/chatAPI";
import { Dispatch } from "redux";

let initialState = {
    messages: [] as ChatMessageType[],
};

/// TYPES
type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

/// REDUCER
const chatReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "social-platform/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            };
        default:
            return state;
    }
};

/// ACTION CREATORS
const actions = {
    messagesReceived: (messages: ChatMessageType[]) =>
        ({
            type: "social-platform/chat/MESSAGES_RECEIVED",
            payload: { messages },
        } as const),
};

// THUNKS
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }
    return _newMessageHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    await chatAPI.start();
    await chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};

export const stopMessagesListener = (): ThunkType => async (dispatch) => {
    await chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
    // await chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    await chatAPI.sendMessage(message);
};

export default chatReducer;
