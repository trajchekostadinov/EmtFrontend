import './BooksPage.css';
import { useState } from 'react';
import { Box, Button, CircularProgress, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useBooks from '../../../hooks/useBooks.ts';
import BookGrid from '../../components/book/BookGrid/BookGrid.tsx';
import BookDialog from '../../components/book/BookDialog/AddBookDialog.tsx';
import type { Book, BookState, CreateBookDto } from '../../../api/types/book.ts';

const BooksPage = () => {
    // Filter state
    const [stateFilter, setStateFilter] = useState<BookState | null>(null);

    // CRUD hook
    const { books, loading,create,update,remove } = useBooks(stateFilter);

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    // Otvori Add dialog
    const handleOpenAdd = () => {
        setSelectedBook(null);
        setDialogOpen(true);
    };

    // Otvori Edit dialog
    const handleOpenEdit = (book: Book) => {
        setSelectedBook(book);
        setDialogOpen(true);
    };

    // Zatvori dialog
    const handleClose = () => {
        setDialogOpen(false);
        setSelectedBook(null);
    };

    // Submit (Add ili Edit)
    const handleSubmit = async (dto: CreateBookDto) => {
        if (selectedBook) {
            await update(selectedBook.id, dto);
        } else {
            await create(dto);
        }
    };

    return (
        <Box className="books-box">
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>Books</Typography>                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAdd}
                >
                    Add Book
                </Button>
            </Box>

            {/* Filter */}
            <ToggleButtonGroup
                value={stateFilter}
                exclusive
                onChange={(_, val) => setStateFilter(val)}
                size="small"
                sx={{ mb: 3 }}
            >
                <ToggleButton value={null as unknown as BookState}>All</ToggleButton>
                <ToggleButton value="GOOD">Good</ToggleButton>
                <ToggleButton value="BAD">Bad</ToggleButton>
            </ToggleButtonGroup>

            {/* Loading */}
            {loading && (
                <Box className="progress-box">
                    <CircularProgress />
                </Box>
            )}

            {/* Grid */}
            {!loading && (
                <BookGrid
                    books={books}
                    onEdit={handleOpenEdit}
                    onDelete={remove}
                />
            )}

            {/* Dialog (reuse za Add i Edit) */}
            <BookDialog
                key={selectedBook?.id ?? 'new'}
                open={dialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                editBook={selectedBook}
            />
        </Box>
    );
};

export default BooksPage;