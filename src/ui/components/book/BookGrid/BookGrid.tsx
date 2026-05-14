import { Grid } from '@mui/material';
import BookCard from '../BookCard/BookCard.tsx';
import type { Book } from '../../../../api/types/book.ts';

interface BookGridProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
}

const BookGrid = ({ books, onEdit, onDelete }: BookGridProps) => {
    return (
        <Grid container spacing={3}>
            {books.map(book => (
                <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <BookCard
                        book={book}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default BookGrid;