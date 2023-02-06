import React, { FC, useEffect, useRef, useState } from "react";
import { Message } from "./Message/Message";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../store/store";

export const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messageRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    useEffect(() => {
        isAutoScroll && messageRef.current?.scrollIntoView(true);
    }, [messages]);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (
            Math.abs(
                element.scrollHeight - element.scrollTop - element.clientHeight
            ) < 300
        ) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    return (
        <div
            style={{ height: "400px", overflowY: "auto" }}
            onScroll={scrollHandler}
        >
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            <div ref={messageRef}></div>
        </div>
    );
};