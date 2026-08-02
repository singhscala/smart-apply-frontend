import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user";

const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const getProfile = async () => {
    const response = await axios.get(`${BASE_URL}/profile`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const getUserSkills = async () => {
    const response = await axios.get(`${BASE_URL}/skills`, {
        headers: getAuthHeader()
    });
    return response.data;
};