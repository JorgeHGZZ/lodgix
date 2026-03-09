/*import { useState, FormEvent } from "react";
import authService from "../services/authService";*/
import style from "../styles/Login.module.css"
import { NavLink } from "react-router-dom";

function Login() {
    /*const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const validarEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validarPassword = (password: string): boolean => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/.test(password);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!validarEmail(email)) {
            setError("Email inválido");
            return;
        }

        if (!validarPassword(password)) {
            setError("La contraseña debe tener mayúscula, número y símbolo");
            return;
        }

        try {
            const response = await authService.login(email, password);
            localStorage.setItem("token", response.token);
            alert("Login exitoso");
        } catch (err) {
            setError("Error al iniciar sesión");
        }

    };*/

    return (
        <div className={style.loginContainer}>
            <div className={style.formContainer}>
                <p className={style.title}>Login</p>
                <form className={style.form}>
                    <div className={style.inputGroup}>
                        <label className={style.label} htmlFor="username">Username</label>
                        <input className={style.input} type="text" name="username" id="username" placeholder="" />
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.label} htmlFor="password">Password</label>
                        <input className={style.input} type="password" name="password" id="password" placeholder="" />
                        <div className={style.forgot}>
                            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                        </div>
                    </div>
                    <NavLink to="/dashboard" className={style.sign}>Sign in</NavLink>
                </form>
                <div className={style.socialMessage}>
                    <div className={style.line}></div>
                    <p className={style.message}>Login with social accounts</p>
                    <div className={style.line}></div>
                </div>
                <div className={style.socialIcons}>
                    <button aria-label="Log in with Google" className={style.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={style.w5h5fillCurrent}>
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                    <button aria-label="Log in with Twitter" className={style.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={style.w5h5fillCurrent}>
                            <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2。922 5.457-1.077-0.034-2.092-0.33-2.977-0.822v0.082c0 3.183 2.263 5.839 5.263 6.437-0.551 0.15-1.132 0.23-1.736 0.23-0.425 0-0.837-0.041-1.24-0.118 0.838 2.617 3.263 4.521 6.137 4.571-2.247 1.761-5.078 2.809-8.154 2.809-0.53 0-1.052-0.031-1.567-0.092 2.905 1.863 6.361 2.951 10.079 2.951z"></path>
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                    </button>
                </div>
                <p className={style.signup}>Don't have an account?
                    <NavLink to="/register" className={style.link}>Sign up</NavLink>
                </p>
            </div>
        </div>
    );
}

export default Login;