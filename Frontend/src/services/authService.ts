interface AuthResponse {
    message: string;
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

const API_URL = "http://localhost:5000/api/auth";

const login = async (email: string, password: string): Promise<AuthResponse> => {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        } as LoginRequest)
    });

    if (!response.ok) {
        throw new Error("Error en login");
    }

    const data: AuthResponse = await response.json();

    return data;
};

const register = async (email: string, password: string): Promise<AuthResponse> => {

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error("Error en registro");
    }

    return await response.json();
};

export default {
    login,
    register
};