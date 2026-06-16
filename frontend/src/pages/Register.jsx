import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [interests, setInterests] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ fullName, email, password, interests });
            navigate('/login');
        } catch (err) {
            alert(err?.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Box component="form" onSubmit={submit} sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" mb={3}>
                Register
            </Typography>
            <TextField fullWidth label="Full Name" margin="normal" value={fullName} onChange={e => setFullName(e.target.value)} />
            <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <TextField fullWidth label="Interests" margin="normal" helperText="E.g. AI, web development, data science" value={interests} onChange={e => setInterests(e.target.value)} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Create account
            </Button>
        </Box>
    );
}
