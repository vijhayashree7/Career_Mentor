import { Container, CssBaseline, Typography } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoleSelect from './pages/RoleSelect';
import StudentQuestionnaire from './pages/StudentQuestionnaire';

function App() {
    const location = useLocation();

    const isHome = location.pathname === '/';

    return (
        <>
            <CssBaseline />
            {!isHome && (
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Typography variant="h3" align="center" gutterBottom>
                        AI Career Mentor
                    </Typography>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/role-select" element={<RoleSelect />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/student-setup" element={<StudentQuestionnaire />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Container>
            )}

            {isHome && (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/role-select" element={<RoleSelect />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            )}
        </>
    );
}

export default App;
