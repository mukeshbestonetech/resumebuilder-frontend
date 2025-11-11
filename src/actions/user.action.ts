import axiosInstance from "../lib/axios";

export const getUserDetails = async() => {
    try {
        const response = await axiosInstance.get('/users/details');
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
}
