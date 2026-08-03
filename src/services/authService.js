<<<<<<< HEAD
import api from "./api";

export const loginUser = async (loginData) => {
    const response = await api.post("/auth/login", loginData);
    return response.data;
};

export const registerUser = async (registerData) => {
    const response = await api.post("/auth/register", registerData);
    return response.data;
=======
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const register = async (fullName, email, password, role) => {
    const response = await axios.post(`${BASE_URL}/register`, {
        fullName,
        email,
        password,
        role
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password
    });

    // save to localStorage so all pages can use it
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("fullName", response.data.fullName);
    localStorage.setItem("role", response.data.role);

    return response.data;
};

export const logout = () => {
    localStorage.clear();
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getRole = () => {
    return localStorage.getItem("role");
};

export const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
>>>>>>> main
};