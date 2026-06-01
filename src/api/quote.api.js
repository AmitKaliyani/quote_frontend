import axiosInstance from "./axios";

export const getTrendingQuote = async() => {
 const response = await axiosInstance.get('/quotes/trending-quotes')
 return response.data.data
} 