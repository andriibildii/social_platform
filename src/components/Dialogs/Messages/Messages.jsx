import style from "./Messages.module.css";

const Messages = ({ message }) => {
	return <div className={style.message}>{message}</div>;
};

export default Messages;
