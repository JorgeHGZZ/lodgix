import { ReactNode } from "react";
import styles from "../../styles/Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    onClose: () => void;
    footer?: ReactNode;
    showCloseButton?: boolean;
    className?: string;
}

function Modal({
    isOpen,
    title,
    children,
    onClose,
    footer,
    showCloseButton = true,
    className = "",
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={`${styles.modal} ${className}`} onClick={(event) => event.stopPropagation()}>
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {showCloseButton && (
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Cerrar modal"
                        >
                            ×
                        </button>
                    )}
                </div>
                <div className={styles.content}>{children}</div>
                {footer && <div className={styles.footer}>{footer}</div>}
            </div>
        </div>
    );
}

export default Modal;
