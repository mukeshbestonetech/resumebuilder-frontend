
export interface Resume {
    _id: string;
    title: string;
    updatedAt: string;
    professionalSummary: string;
    skills: string[];
    workExperience: WorkExperience[];
    education: Education[];
}

export interface WorkExperience {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
};
export interface ResumeFormData {
    _id?: string;
    title: string;
    professionalSummary: string;
    skills: string[];
    workExperience: WorkExperience[];
    education: Education[];
}