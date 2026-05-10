import axiosInstance from '../axios/axios.ts';
import type { Book, BookDetails } from "./types/book.ts";

const bookApi = {
    findAll: async (state?: string | null) => {
        const params = state ? `?state=${state}` : '';
        return await axiosInstance.get<Book[]>(`/books${params}`);
    },
    findWithDetailsById: async (id: string) => { // gi naogja od backendot spored id
        return await axiosInstance.get<BookDetails>(`/books/${id}/details`);
    }
};

export default bookApi;