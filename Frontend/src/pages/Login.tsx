import { useState, FormEvent } from "react";
import authService from "../services/authService";

function Login() {

    const [email, setEmail] = useState<string>("");
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

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                Login
            </button>

            {error && <p>{error}</p>}
        </form>
    );

}

export default Login;