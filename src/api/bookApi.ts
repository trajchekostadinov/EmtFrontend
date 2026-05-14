import axiosInstance from '../axios/axios.ts';
import type { Book, BookDetails, BookState, CreateBookDto } from './types/book.ts';

const bookApi = {
    findAll: async (state?: BookState | null) => {
        const params = state ? `?state=${state}` : '';
        return await axiosInstance.get<Book[]>(`/books${params}`);
    },

    findById: async (id: string | number) => {
        return await axiosInstance.get<Book>(`/books/${id}`);
    },

    findWithDetailsById: async (id: string | number) => {
        return await axiosInstance.get<BookDetails>(`/books/${id}/details`);
    },

    create: async (dto: CreateBookDto) => {
        return await axiosInstance.post<Book>('/books/add', dto);
    },

    update: async (id: string | number, dto: CreateBookDto) => {
        return await axiosInstance.put<Book>(`/books/${id}/edit`, dto);
    },

    deleteById: async (id: string | number) => {
        return await axiosInstance.delete<Book>(`/books/${id}/delete`);
    },
};

export default bookApi;