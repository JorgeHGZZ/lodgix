interface LoginResponse {
    message: string;
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

const API_URL = "http://localhost:5000/api/auth";

const login = async (email: string, password: string): Promise<LoginResponse> => {

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

    const data: LoginResponse = await response.json();

    return data;
};

const authService = {
    login
};

export default authService;