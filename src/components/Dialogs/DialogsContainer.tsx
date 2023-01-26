import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import { AddMessageForm } from "./AddMessageForm/AddMessageForm";
import Card from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import style from "./Dialogs.module.css";
import { AppStateType } from "../../redux/store";

const DialogsContainer: FC = () => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dialogs = useSelector(
        (state: AppStateType) => state.dialogsPage.dialogs
    );
    const messages = useSelector(
        (state: AppStateType) => state.dialogsPage.messages
    );

    useEffect(() => {
        !isAuth && navigate("/login");
    }, [isAuth]);

    return (
        <Box>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnSpacing={1}
                rowSpacing={1}
            >
                <Grid item xs={9} md={4}>
                    <Card>
                        <div className={style.dialogs}>
                            <div className={style.dialogsItems}>
                                {dialogs.map((dialog) => (
                                    <DialogItem
                                        name={dialog.name}
                                        id={dialog.id}
                                        key={dialog.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={9} md={8}>
                    <Card>
                        <div className={style.messages}>
                            <div>
                                {messages.map((messageItem) => (
                                    <Messages
                                        message={messageItem.message}
                                        key={messageItem.id}
                                    />
                                ))}
                            </div>
                            <div className={style.form}>
                                <AddMessageForm />
                            </div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DialogsContainer;
