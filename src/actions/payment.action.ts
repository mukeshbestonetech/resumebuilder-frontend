import axiosInstance from "../lib/axios";

export const createCheckoutSession = async (data: {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}) => {
    try {
        const response = await axiosInstance.post('/payment/create-checkout-session', data);
        return response.data;
    } catch (error) {
        console.error("Error creating checkout session:", error);
    }
}
