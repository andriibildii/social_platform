import React from 'react';
import styles from "./FormsControls.module.css";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;
type CheckboxInputProps = FieldRenderProps<boolean, any>;

export const Input: React.FC<Props> = ({ input, meta: {error, touched}, ...rest }: Props) => {
  const hasError = error && touched;
  return (
    <div className={styles.formControl + " " + (hasError && styles.error)}>
      <div>
        <input type="text" {...input} {...rest} />
      </div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const TextArea: React.FC<Props> = ({ input, meta: {error, touched}, ...rest }: Props) => {
  const hasError = error && touched;
  return (
    <div className={styles.formControl + " " + (hasError && styles.error)}>
      <div>
        <textarea {...input} {...rest} />
      </div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({input: { value, ...input }}: CheckboxInputProps) => {
  return (
    <div className={styles.formControl}>
      <div>
        <input {...input} type="checkbox" checked={value} />
      </div>
    </div>
  )
}