export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

type MessagesReceivedSubscribersType = (messages: ChatMessageAPIType[]) => void;
export type StatusType = "pending" | "ready" | "error";
type StatusChangedSubscribersType = (status: StatusType) => void;

let ws: WebSocket | null = null;

const subscribers = {
    "messages-received": [] as MessagesReceivedSubscribersType[],
    "status-changed": [] as StatusChangedSubscribersType[],
};

const notifySubscribersStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach((s) => s(status));
};

const closeHandler = () => {
    // for reconnect we should recall function createChannel()
    console.log("CLOSE WS");
    notifySubscribersStatus("pending");
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subscribers["messages-received"].forEach((subscriber) =>
        subscriber(newMessage)
    );
};

const openHandler = () => {
    notifySubscribersStatus("ready");
};

const errorHandler = () => {
    notifySubscribersStatus("error");
    console.error("REFRESH PAGE");
};

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener("open", openHandler);
    ws?.removeEventListener("error", errorHandler);
};

function createChannel() {
    if (ws !== null) {
        cleanUp();
        ws?.close();
    }

    ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );
    notifySubscribersStatus("pending");
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);
    ws.addEventListener("open", openHandler);
    ws.addEventListener("error", errorHandler);

    // if (ws !== null) {
    //     setTimeout(() => {
    //         cleanUp()
    //         ws?.close();
    //     }, 500)
    // }
    //
    // setTimeout(() => {
    //     ws = new WebSocket(
    //       "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    //     );
    //     ws.addEventListener("error", errorHandler);
    //     ws.addEventListener("open", openHandler);
    //     ws.addEventListener("message", messageHandler);
    //     ws.addEventListener("close", closeHandler);
    // }, 1000)
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers["messages-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        if (ws?.readyState === 1) {
            return ws?.close();
        }
    },
    subscribeOnNewMessages(callback: MessagesReceivedSubscribersType) {
        subscribers["messages-received"].push(callback);
        return () => {
            subscribers["messages-received"] = subscribers[
                "messages-received"
            ].filter((s) => s !== callback);
        };
    },

    unsubscribeFromNewMessages(callback: MessagesReceivedSubscribersType) {
        subscribers["messages-received"] = subscribers[
            "messages-received"
        ].filter((s) => s !== callback);
    },

    subscribeOnStatusChanging(callback: StatusChangedSubscribersType) {
        subscribers["status-changed"].push(callback);
        return () => {
            subscribers["status-changed"] = subscribers[
                "status-changed"
            ].filter((s) => s !== callback);
        };
    },

    unsubscribeFromStatusChanging(callback: StatusChangedSubscribersType) {
        subscribers["status-changed"] = subscribers["status-changed"].filter(
            (s) => s !== callback
        );
    },

    sendMessage(message: string) {
        ws?.send(message);
    },
};
