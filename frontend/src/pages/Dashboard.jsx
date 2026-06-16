import { Box, Paper, Typography } from '@mui/material';

export default function Dashboard() {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Career Dashboard
            </Typography>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1">Profile Summary</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Your personalized career guidance workspace will be available here after login.
                </Typography>
            </Paper>
            <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1">Upcoming features</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Resume analysis, skill gap reports, learning roadmaps, interview preparation, and project recommendations.
                </Typography>
            </Paper>
        </Box>
    );
}
