import axiosInstance from '../axios/axios.ts';
import type { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from './types/auth.ts';

const authApi = {
    login: async (dto: LoginRequest) => {
        return await axiosInstance.post<LoginResponse>('/user/login', dto);
    },

    register: async (dto: RegisterRequest) => {
        return await axiosInstance.post<UserResponse>('/user/register', dto);
    },

    me: async () => {
        return await axiosInstance.get<UserResponse>('/user/me');
    },
};

export default authApi;