import { FC, useEffect, useState } from "react";
import { ChatMessageType, wsChannel } from "../../../ChatPage";

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
