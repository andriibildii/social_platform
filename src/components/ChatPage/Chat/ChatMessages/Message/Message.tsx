import React, { FC } from "react";
import { ChatMessageAPIType } from "../../../../../api/chatAPI";

export const Message: FC<{ message: ChatMessageAPIType }> = React.memo(
    ({ message }) => {
        console.log("MESSAGE>>>>>");

        return (
            <div>
                <img src={message.photo} style={{ width: "30px" }} />
                <b>{message.userName}</b>
                <br />
                {message.message}
                <hr />
            </div>
        );
    }
);
