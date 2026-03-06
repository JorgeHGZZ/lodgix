interface ButtonProps {
    titulo: string;
    classname?: string;
    onClick?: () => void;
}

function Button({ titulo, classname, onClick }: ButtonProps) {
    return (
        <button className={classname} onClick={onClick}>{titulo}</button>
    )
}

export default Button