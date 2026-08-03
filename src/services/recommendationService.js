import api from "./api";

export const getRecommendations = async (page = 0, size = 5) => {

    const response = await api.get(
        `/recommendations?page=${page}&size=${size}`
    );

    return response.data;
};