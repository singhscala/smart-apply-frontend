import api from "./api";

export const getCareerAdvice = async (request) => {

    const response = await api.post(
        "/gemini/career-advice",
        request
    );

    return response.data;
};