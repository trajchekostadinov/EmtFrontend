import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, CircularProgress, Paper, TextField, Typography, Alert } from '@mui/material';
import authApi from '../../../api/authApi.ts';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            await authApi.register(form); // koga se registrira,
            navigate('/login');     // redirect na /login da se najavi
        } catch {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isValid = Object.values(form).every(v => v.trim() !== '');

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
                    Register
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth />
                    <TextField label="Surname" value={form.surname} onChange={handleChange('surname')} fullWidth />
                    <TextField label="Email" value={form.email} onChange={handleChange('email')} fullWidth />
                    <TextField label="Username" value={form.username} onChange={handleChange('username')} fullWidth />
                    <TextField label="Password" type="password" value={form.password} onChange={handleChange('password')} fullWidth />

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                        disabled={loading || !isValid}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={20} /> : 'Register'}
                    </Button>

                    <Typography variant="body2" textAlign="center">
                        Already have an account?{' '}
                        <Link to="/login">Login</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default RegisterPage;