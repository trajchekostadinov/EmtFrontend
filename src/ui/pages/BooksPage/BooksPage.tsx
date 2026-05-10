import './BooksPage.css';
import useBooks from '../../../hooks/useBooks.ts';
import { Box, CircularProgress } from '@mui/material';
import BookGrid from '../../components/book/BookGrid/BookGrid.tsx';
import { useState } from 'react';

const BooksPage = () => {
    const [state, setState] = useState<string | null>(null);
    const { books, loading } = useBooks(state);

    return (
        <Box className='books-box'>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <button onClick={() => setState(null)}>All</button>
                <button onClick={() => setState("GOOD")}>Good</button>
                <button onClick={() => setState("BAD")}>Bad</button>
            </Box>

            {loading && (
                <Box className='progress-box'>
                    <CircularProgress />
                </Box>
            )}

            {!loading && <BookGrid books={books} />}
        </Box>
    );
};

export default BooksPage;