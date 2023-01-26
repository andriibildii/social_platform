import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../redux/chat-reducer";
import { AppDispatch, AppStateType } from "../../../redux/store";
import { Button, TextField } from "@mui/material";

export const AddMessageForm: FC = () => {
    const [message, setMessage] = useState("");
    const status = useSelector((state: AppStateType) => state.chat.status);

    const dispatch = useDispatch<AppDispatch>();

    const sendMessageHandler = () => {
        if (!message) return;
        dispatch(sendMessage(message));
        setMessage("");
    };

    return (
        <>
            <div>
                <TextField
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                    label="Type your message..."
                    multiline
                    fullWidth
                    rows={2}
                    margin={"normal"}
                ></TextField>
            </div>
            <div>
                <Button
                    variant="contained"
                    disabled={status !== 'ready'}
                    onClick={sendMessageHandler}
                >
                    Send message
                </Button>
            </div>
        </>
    );
};
