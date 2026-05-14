export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterRequest {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
}

export type Role = 'USER' | 'ADMINISTRATOR';

export interface UserResponse {
    username: string;
    name: string;
    surname: string;
    email: string;
    role: Role;
}