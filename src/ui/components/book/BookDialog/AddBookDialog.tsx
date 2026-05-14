import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, MenuItem, CircularProgress, Box
} from '@mui/material';
import type { Book, BookCategory, BookState, CreateBookDto } from '../../../../api/types/book.ts';
import useAuthors from '../../../../hooks/useAuthors.ts';

interface BookDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (dto: CreateBookDto) => Promise<void>;
    editBook?: Book | null;
}

const CATEGORIES: BookCategory[] = ['NOVEL', 'THRILLER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'OTHER'];
const STATES: BookState[] = ['GOOD', 'BAD'];

const emptyForm: CreateBookDto = {
    name: '',
    category: 'NOVEL',
    state: 'GOOD',
    availableCopies: 1,
    authorId: 0,
};

const BookDialog = ({ open, onClose, onSubmit, editBook }: BookDialogProps) => {
    const [form, setForm] = useState<CreateBookDto>(
        editBook
            ? {
                name: editBook.name,
                category: editBook.category,
                state: editBook.state,
                availableCopies: editBook.availableCopies,
                authorId: editBook.author.id,
            }
            : emptyForm
    );
    const [submitting, setSubmitting] = useState(false);
    const { authors, loading: authorsLoading } = useAuthors();

    const handleChange = (field: keyof CreateBookDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [field]: field === 'availableCopies' || field === 'authorId'
                ? Number(e.target.value)
                : e.target.value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.authorId) return;
        setSubmitting(true);
        try {
            await onSubmit(form);
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{editBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Name"
                        value={form.name}
                        onChange={handleChange('name')}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Category"
                        select
                        value={form.category}
                        onChange={handleChange('category')}
                        fullWidth
                    >
                        {CATEGORIES.map(c => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="State"
                        select
                        value={form.state}
                        onChange={handleChange('state')}
                        fullWidth
                    >
                        {STATES.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Available Copies"
                        type="number"
                        value={form.availableCopies}
                        onChange={handleChange('availableCopies')}
                        slotProps={{ htmlInput: { min: 0 } }}
                        fullWidth
                    />
                    <TextField
                        label="Author"
                        select
                        value={authorsLoading ? '' : (form.authorId || '')}
                        onChange={handleChange('authorId')}
                        fullWidth
                        required
                        disabled={authorsLoading}
                    >
                        {authorsLoading
                            ? <MenuItem value=""><CircularProgress size={20} /></MenuItem>
                            : authors.map(a => (
                                <MenuItem key={a.id} value={a.id}>
                                    {a.name} {a.surname}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>Cancel</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                    disabled={submitting || authorsLoading || !form.name.trim() || !form.authorId}
                >
                    {submitting ? <CircularProgress size={20} /> : editBook ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookDialog;