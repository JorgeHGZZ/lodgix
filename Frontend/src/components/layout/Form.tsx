import { FormEvent, ReactNode } from "react";
import styles from "../../styles/Form.module.css";

interface FormProps {
    title?: string;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
    submitLabel?: string;
    className?: string;
}

function Form({ title, onSubmit, children, submitLabel = "Crear", className = "" }: FormProps) {
    return (
        <div className={`${styles.formWrapper} ${className}`}>
            {title && <h2 className={styles.formTitle}>{title}</h2>}
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
                <div className={styles.actions}>
                    <button type="submit" className={styles.submitButton}>
                        {submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
