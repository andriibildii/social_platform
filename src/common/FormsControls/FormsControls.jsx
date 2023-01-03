import styles from "./FormsControls.module.css";

const FormControl = ({ input, meta, ...props }) => {
    const error = meta.error && meta.touched;
    return (
        <div className={styles.formControl + " " + (error && styles.error)}>
            <div>{props.children}</div>
            {error && <span>{meta.error}</span>}
        </div>
    );
};

export const TextArea = (props) => {
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    );
};

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    );
};
