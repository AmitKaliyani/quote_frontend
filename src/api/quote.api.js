import axiosInstance from "./axios";

export const getTrendingQuote = async () => {
  const response = await axiosInstance.get("/quotes/trending-quotes");
  return response.data.data;
};

export const getAllQuotes = async (filters) => {
  const response = await axiosInstance.get("/quotes", { params: filters });

  return response.data?.data;
};

export const getMyQuotes = async (filters) => {
  const response = await axiosInstance.get("/quotes/me", { params: filters });
  return response.data;
};

export const getMySavedQuote = async () => {
  const response = await axiosInstance.get("/quotes/saved");
  return response.data;
};

export const getQuoteById = async (id) => {
  const response = await axiosInstance.get(`/quotes/${id}`);
  return response.data;
};
export const getQuoteByAuthor = async (submittedBy) => {
  const response = await axiosInstance.get(`/quotes`, {
    params: { submittedBy },
  });
  return response.data;
};

export const createQuote = async (data) => {
  const response = await axiosInstance.post("/quotes", data);
  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await axiosInstance.delete(`/quotes/${id}`);
  return response.data;
};

export const updateQuote = async (id, data) => {
  const response = await axiosInstance.patch(`/quotes/${id}`, data);

  return response.data;
};

export const toggleLike = async (quoteId) => {
  const response = await axiosInstance.post(`/quotes/${quoteId}/like`);
  return response.data;
};

export const toggleSaved = async (id) => {
  const response = await axiosInstance.post(`/quotes/${id}/save`);
  return response.data;
};
