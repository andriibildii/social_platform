import { FC } from "react";
import style from "./Messages.module.css";

type PropsType = {
	message: string
}

const Messages: FC<PropsType> = ({ message }) => {
	return <div className={style.message}>{message}</div>;
};

export default Messages;
