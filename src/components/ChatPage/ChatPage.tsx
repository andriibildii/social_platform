import { FC, useEffect } from "react";
import { Messages } from "./ChatMessages/Messages";
import { AddMessageForm } from "./ChatAddMessageForm/AddMessageForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../redux/store";
import {
    startMessagesListening,
    stopMessagesListener,
} from "../../redux/chat-reducer";
import { Grid } from "@mui/material";

const ChatPage: FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListener());
        };
    }, []);

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnSpacing={1}
                rowSpacing={1}
            >
                <Grid item xs={9} xl={12}>
                    {status === "error" && (
                        <div>Error, please refresh the page</div>
                    )}
                    <Messages />
                </Grid>
                <Grid item xs={9} xl={12}>
                    <AddMessageForm />
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatPage;
