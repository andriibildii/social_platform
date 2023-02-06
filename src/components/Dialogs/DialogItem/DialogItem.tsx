import { FC } from "react";
import { NavLink } from "react-router-dom";
import style from "./DialogItem.module.css";

type PropsType = {
	name: string
	id: number
}
const DialogItem: FC<PropsType> = ({ name, id }) => {
	return (
		<div className={`${style.dialog} ${style.active}`}>
			<NavLink to={`/dialogs/${id}`}>{name}</NavLink>
		</div>
	);
};

export default DialogItem;
