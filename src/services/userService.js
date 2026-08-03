import api from "./api";

export const getProfile = async () => {
    const response = await api.get("/user/profile");
    return response.data;
};

export const getUserSkills = async () => {
    const response = await api.get("/user/skills");
    return response.data;
};