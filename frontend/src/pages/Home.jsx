import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
    return (
        <Box className="hero-root">
            <div className="hero-bg" aria-hidden="true" />
            <div className="hero-overlay" aria-hidden="true" />
            <Box className="hero-content">
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.02em', textShadow: '0 4px 18px rgba(0,0,0,0.45)' }}>
                    Welcome to AI Career Mentor
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: 760, mx: 'auto', mb: 4, color: 'rgba(255,255,255,0.9)' }}>
                    Discover career paths, identify skill gaps, build learning roadmaps, and prepare for interviews with AI-powered guidance.
                </Typography>
                <Button component={RouterLink} to="/register" variant="contained" sx={{ mr: 2 }}>
                    Get Started
                </Button>
                <Button component={RouterLink} to="/login" variant="outlined">
                    Login
                </Button>
            </Box>
        </Box>
    );
}
