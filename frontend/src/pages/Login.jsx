import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ email, password });
            localStorage.setItem('userEmail', email);
            navigate('/role-select');
        } catch (err) {
            alert(err?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Box component="form" onSubmit={submit} sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" mb={3}>
                Login
            </Typography>
            <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Sign in
            </Button>
        </Box>
    );
}
