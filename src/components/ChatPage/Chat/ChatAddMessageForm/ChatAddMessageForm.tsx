import { FC, useState } from "react";
import { wsChannel } from "../../ChatPage";

export const ChatAddMessageForm: FC = () => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!message) return;
        wsChannel.send(message);
        setMessage("");
    };
    return (
        <>
            <div>
                <textarea
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                ></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Add message</button>
            </div>
        </>
    );
};
