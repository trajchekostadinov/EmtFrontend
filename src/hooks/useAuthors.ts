import { useCallback, useEffect, useState } from 'react';
import authorApi from '../api/authorApi.ts';
import type { Author } from '../api/types/author.ts';

const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchAuthors = useCallback(async () => {
        setLoading(true);
        try {
            const response = await authorApi.findAll();
            setAuthors(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error fetching authors'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchAuthors();
    }, [fetchAuthors]);

    return { authors, loading, error, fetchAuthors };
};

export default useAuthors;