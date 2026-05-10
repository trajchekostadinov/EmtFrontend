import { useCallback, useEffect, useState } from 'react';
import bookApi from '../api/bookApi.ts';
import type { Book } from "../api/types/book.ts";

const useBooks = (state?: string | null) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBooks = useCallback(async () => {
        setLoading(true);

        try {
            const response = await bookApi.findAll(state);
            setBooks(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error'));
        } finally {
            setLoading(false);
        }
    }, [state]);

    useEffect(() => {
        void fetchBooks();
    }, [fetchBooks]);

    return { books, loading, error };
};

export default useBooks;