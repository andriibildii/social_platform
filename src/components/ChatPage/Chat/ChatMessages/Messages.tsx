import { FC } from "react";
import { Message } from "./Message/Message";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../../redux/store";

export const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);

    return (
        <div style={{ height: "400px", overflowY: "auto" }}>
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
        </div>
    );
};
