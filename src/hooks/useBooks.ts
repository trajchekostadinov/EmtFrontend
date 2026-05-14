import { useCallback, useEffect, useState } from 'react';
import bookApi from '../api/bookApi.ts';
import type { Book, BookState, CreateBookDto } from '../api/types/book.ts';

const BOOK_STATES = ['GOOD', 'BAD'] as const;
const BOOK_CATEGORIES = ['NOVEL', 'THRILLER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'OTHER'] as const;

const useBooks = (stateFilter?: BookState | null) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await bookApi.findAll(stateFilter);
            setBooks(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setLoading(false);
        }
    }, [stateFilter]);

    const create = useCallback(async (data: CreateBookDto) => {
        await bookApi.create(data);
        await fetch();
    }, [fetch]);

    const update = useCallback(async (id: number, data: CreateBookDto) => {
        await bookApi.update(id, data);
        await fetch();
    }, [fetch]);

    const remove = useCallback(async (id: number) => {
        await bookApi.deleteById(id);
        await fetch();
    }, [fetch]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return {
        books,
        loading,
        error,
        fetch,
        create,
        update,
        remove,
        states: BOOK_STATES,
        categories: BOOK_CATEGORIES,
    };
};

export default useBooks;