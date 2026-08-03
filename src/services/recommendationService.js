import api from "./api";


export const getRecommendations = async (page, size) => {

    const response = await api.get(
        `/recommendations?page=${page}&size=${size}`
    );

    return response.data;

};