import axios from "axios";

const BASE_URL = "http://localhost:8080/api/resume";

const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

export const getResumeAnalysis = async () => {
    const response = await axios.get(`${BASE_URL}/analysis`, {
        headers: getAuthHeader()
    });
    return response.data;
};