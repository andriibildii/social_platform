import { BaseThunkType, InferActionsTypes } from "./store";
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chatAPI";
import { Dispatch } from "redux";
import {v1} from 'uuid';

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType,
};

/// TYPES
type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
export type ChatMessageType = ChatMessageAPIType & {id: string}

/// REDUCER
const chatReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "social-platform/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                // messages: [...state.messages, ...action.payload.messages],
                messages: [
                    ...state.messages,
                    ...action.payload.messages.map((message) => ({
                        ...message,
                        id: v1(),
                    })),
                ].filter((m, index, array) => index >= array.length - 100),
            };
        case "social-platform/chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status,
            };
        default:
            return state;
    }
};

/// ACTION CREATORS
const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({
            type: "social-platform/chat/MESSAGES_RECEIVED",
            payload: { messages },
        } as const),
    statusChanged: (status: StatusType) =>
        ({
            type: "social-platform/chat/STATUS_CHANGED",
            payload: { status },
        } as const),
};

// THUNKS
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }
    return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
        };
    }
    return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribeOnNewMessages(newMessageHandlerCreator(dispatch));
    chatAPI.subscribeOnStatusChanging(statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListener = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribeFromNewMessages(newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribeFromStatusChanging(
        statusChangedHandlerCreator(dispatch)
    );
    chatAPI.stop();
};

export const sendMessage =
    (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message);
    };

export default chatReducer;
