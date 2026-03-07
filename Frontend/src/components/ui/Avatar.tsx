import style from "../../styles/Avatar.module.css";

interface AvatarProps {
    src?: string;
    alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
    return (
        <div className={style.avatar}>
            {src ? <img src={src} alt={alt} /> : <span>U</span>}
        </div>
    );
};

export default Avatar;