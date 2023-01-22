import { FC } from "react";
import { ChatMessageType } from "../../../../../api/chatAPI";

export const Message: FC<{message: ChatMessageType}> = ({message}) => {

    return (
        <div>
            <img src={message.photo} style={{width: '30px'}}/>
            <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    );
};
