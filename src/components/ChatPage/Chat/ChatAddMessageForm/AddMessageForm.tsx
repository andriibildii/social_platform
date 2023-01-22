import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../../../redux/store";
import { sendMessage } from "../../../../redux/chat-reducer";

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
