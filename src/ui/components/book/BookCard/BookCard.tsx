import {
    Card, CardContent, CardActions, Typography,
    Button, IconButton, Chip, Box, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate } from 'react-router';
import type { Book } from '../../../../api/types/book.ts';

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
}

const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }} elevation={2}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AutoStoriesIcon color="secondary" fontSize="small" />
                    <Typography variant="h6" noWrap title={book.name}>
                        {book.name}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {book.author.name} {book.author.surname}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                    <Chip label={book.category} size="small" variant="outlined" color="secondary" />
                    <Chip
                        label={book.state}
                        size="small"
                        color={book.state === 'GOOD' ? 'success' : 'error'}
                        variant="outlined"
                    />
                    <Chip
                        label={`${book.availableCopies} copies`}
                        size="small"
                        color={book.availableCopies > 0 ? 'success' : 'default'}
                        variant="outlined"
                    />
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(`/books/${book.id}`)}
                >
                    Details
                </Button>
                <Box>
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => onEdit(book)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(book.id)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardActions>
        </Card>
    );
};

export default BookCard;