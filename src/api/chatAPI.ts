export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

type subscribersType = (messages: ChatMessageType[]) => void;

let ws: WebSocket | null = null;

const closeHandler = () => {
    // for reconnect we should recall function createChannel()
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subscribers.forEach((subscriber) => subscriber(newMessage));
};

function createChannel() {
    // if ws !== null
    ws?.removeEventListener("close", closeHandler);
    ws?.close();
    ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);
}

let subscribers = [] as subscribersType[];

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener("close", closeHandler);
        ws?.removeEventListener("message", messageHandler);
        ws?.close();
    },
    subscribe(callback: subscribersType) {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter((s) => s !== callback);
        };
    },
    unsubscribe(callback: subscribersType) {
        subscribers = subscribers.filter((s) => s !== callback);
    },

    sendMessage(message: string) {
        ws?.send(message);
    },
};
