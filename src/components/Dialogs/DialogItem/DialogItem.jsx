import { NavLink } from "react-router-dom";
import style from "./DialogItem.module.css";

const DialogItem = ({ name, id }) => {
	return (
		<div className={`${style.dialog} ${style.active}`}>
			<NavLink to={`/dialogs/${id}`}>{name}</NavLink>
		</div>
	);
};

export default DialogItem;
