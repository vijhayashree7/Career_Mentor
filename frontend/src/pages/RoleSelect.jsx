import { Box, Button, Typography, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function RoleSelect() {
    const navigate = useNavigate();
    const [role, setRole] = useState('Student');
    const email = localStorage.getItem('userEmail');

    const submit = async () => {
        if (!email) { alert('Not logged in'); return navigate('/login'); }
        try {
            await api.post('/auth/role', { email, role });
            navigate('/dashboard');
        } catch (e) { alert('Failed to save role'); }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 8 }}>
            <Paper elevation={6} sx={{ width: '100%', maxWidth: 720, p: { xs: 3, md: 6 }, textAlign: 'center', background: 'rgba(255,255,255,0.9)' }}>
                <Typography variant="h4" mb={1} sx={{ fontWeight: 700 }}>AI Career Mentor</Typography>
                <Typography variant="h6" mb={3} color="text.secondary">Select your profile</Typography>

                <Stack spacing={2} direction="column" sx={{ alignItems: 'center', mb: 2 }}>
                    <Button fullWidth variant={role === 'Student' ? 'contained' : 'outlined'} onClick={() => setRole('Student')}>School Student</Button>
                    <Button fullWidth variant={role === 'College' ? 'contained' : 'outlined'} onClick={() => setRole('College')}>College / Graduate</Button>
                    <Button fullWidth variant={role === 'Professional' ? 'contained' : 'outlined'} onClick={() => setRole('Professional')}>Working Professional</Button>
                </Stack>

                <Button variant="contained" size="large" onClick={async () => {
                    if (role === 'Student') return navigate('/student-setup');
                    if (role === 'College') return navigate('/college-setup');
                    await submit();
                }} sx={{ mt: 1 }}>Continue</Button>
            </Paper>
        </Box>
    );
}
