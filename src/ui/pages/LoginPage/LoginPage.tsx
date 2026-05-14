import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, CircularProgress, Paper, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../../../context/AuthContext.tsx';
import authApi from '../../../api/authApi.ts';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await authApi.login(form);
            await login(response.data.token);
            navigate('/');
        } catch {
            setError('Invalid username or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
                    Login
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Username"
                        value={form.username}
                        onChange={handleChange('username')}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange('password')}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                        disabled={loading || !form.username || !form.password}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={20} /> : 'Login'}
                    </Button>

                    <Typography variant="body2" textAlign="center">
                        Don't have an account?{' '}
                        <Link to="/register">Register</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;