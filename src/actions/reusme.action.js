import axiosInstance from "../lib/axios";

export const createResume = async (resumeData) => {
    try {
        const response = await axiosInstance.post('/resumes', resumeData);
        return response.data;
    } catch (error) {
        console.error("Error creating resume:", error);
    }
}

export const updateResume = async (resumeId, resumeData) => {
    try {
        const response = await axiosInstance.put(`/resumes/${resumeId}`, resumeData);
        return response.data;
    } catch (error) {
        console.error("Error updating resume:", error);
    }
}
export const generateProfessionalSummary = async (userInput) => {
    try {
        const response = await axiosInstance.post('/resumes/generate-summary', { userInput });
        return response.data;
    } catch (error) {
        console.error("Error generating professional summary:", error);
    }
}
export const generatePdf = async (resumeId, template) => {
    try {
        const response = await axiosInstance.post('/resumes/generate-pdf', { resumeId, template }, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}

export const getResumes = async () => {
    try {
        const response = await axiosInstance.get('/resumes');
        return response.data;
    } catch (error) {
        console.error("Error fetching resumes:", error);
    }
}