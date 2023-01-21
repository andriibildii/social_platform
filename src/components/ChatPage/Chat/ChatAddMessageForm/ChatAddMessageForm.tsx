import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const ChatAddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({
    wsChannel,
}) => {
    const [message, setMessage] = useState("");
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
        "pending"
    );

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus("ready");
        };
        wsChannel?.addEventListener("open", openHandler);
        return () => {
            wsChannel?.removeEventListener("open", openHandler);
        };
    }, [wsChannel]);

    const sendMessage = () => {
        if (!message) return;
        wsChannel?.send(message);
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
                    disabled={wsChannel === null || readyStatus !== "ready"}
                    onClick={sendMessage}
                >
                    Send message
                </Button>
            </div>
        </>
    );
};
