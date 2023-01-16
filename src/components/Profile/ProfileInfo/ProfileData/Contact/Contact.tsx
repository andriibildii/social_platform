import { FC } from "react";
import style from "../../ProfileInfo.module.css";

type PropsTypes = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<PropsTypes> = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export default Contact;
