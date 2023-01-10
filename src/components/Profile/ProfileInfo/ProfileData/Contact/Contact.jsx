import style from "../../ProfileInfo.module.css";

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export default Contact;
