export interface IUser {
    name: string;
    email: string;
    plan: 'Free' | 'Basic' | 'Pro';
    resumeLimit: number;
}