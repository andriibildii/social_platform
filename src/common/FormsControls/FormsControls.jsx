import styles from "./FormsControls.module.css";

const FormControl = ({ input, meta: { error, touched }, ...props }) => {
    const hasError = error && touched;
    return (
        <div className={styles.formControl + " " + (hasError && styles.error)}>
            <div>{props.children}</div>
            {hasError && <span>{error}</span>}
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
