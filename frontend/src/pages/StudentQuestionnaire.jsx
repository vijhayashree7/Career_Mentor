import { Box, Button, Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField, Typography, Paper, FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentQuestionnaire() {
    const navigate = useNavigate();
    const [interests, setInterests] = useState({ painting: false, sports: false, arts: false, dance: false });
    const [subjects, setSubjects] = useState([]);
    const [skills, setSkills] = useState('');
    const [aspiration, setAspiration] = useState('');
    const [ageGroup, setAgeGroup] = useState('10-14');

    const subjectsOptions = [
        'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'Botany', 'Zoology',
        'English', 'History', 'Geography', 'Civics', 'Economics', 'Computer Basics',
        'Drawing', 'Art', 'Music', 'Physical Education', 'Social Studies'
    ];

    function toggleInterest(key) {
        setInterests(prev => ({ ...prev, [key]: !prev[key] }));
    }

    const toggleSubject = (s) => {
        if (subjects.includes(s)) setSubjects(subjects.filter(x => x !== s));
        else if (subjects.length < 3) setSubjects(prev => [...prev, s]);
    };

    const submit = () => {
        const payload = { interests, subjects, skills, aspiration, ageGroup };
        // TODO: send to backend or store in localStorage
        localStorage.setItem('studentProfile', JSON.stringify(payload));
        navigate('/dashboard');
    };

    return (
        <Box sx={{ maxWidth: 980, mx: 'auto', py: 6 }}>
            <Paper sx={{ px: { xs: 3, md: 6 }, py: { xs: 3, md: 5 }, background: 'rgba(255,255,255,0.9)' }} elevation={3}>
                <Typography variant="h4" mb={1}>Tell us about you</Typography>

                <Grid container spacing={4} alignItems="flex-start">
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <FormLabel component="legend" sx={{ mb: 1 }}>General interests</FormLabel>
                            <Box>
                                <FormControlLabel control={<Checkbox checked={interests.painting} onChange={() => toggleInterest('painting')} />} label="Painting" />
                                <FormControlLabel control={<Checkbox checked={interests.sports} onChange={() => toggleInterest('sports')} />} label="Sports" />
                                <FormControlLabel control={<Checkbox checked={interests.arts} onChange={() => toggleInterest('arts')} />} label="Arts" />
                                <FormControlLabel control={<Checkbox checked={interests.dance} onChange={() => toggleInterest('dance')} />} label="Dance" />
                                <FormControlLabel control={<Checkbox checked={interests.coding} onChange={() => toggleInterest('coding')} />} label="Coding" />
                                <FormControlLabel control={<Checkbox checked={interests.robotics} onChange={() => toggleInterest('robotics')} />} label="Robotics" />
                                <FormControlLabel control={<Checkbox checked={interests.music} onChange={() => toggleInterest('music')} />} label="Music" />
                                <FormControlLabel control={<Checkbox checked={interests.photography} onChange={() => toggleInterest('photography')} />} label="Photography" />
                                <FormControlLabel control={<Checkbox checked={interests.theatre} onChange={() => toggleInterest('theatre')} />} label="Theatre" />
                                <FormControlLabel control={<Checkbox checked={interests.languages} onChange={() => toggleInterest('languages')} />} label="Languages" />
                            </Box>
                        </FormControl>

                        <Box sx={{ mt: 2 }}>
                            <FormLabel component="legend" sx={{ mb: 1 }}>What would you like to become?</FormLabel>
                            <TextField fullWidth placeholder="E.g. Artist, Engineer, Dancer, Athlete" value={aspiration} onChange={e => setAspiration(e.target.value)} />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <FormLabel component="legend" sx={{ mb: 1 }}>Subjects you are good at (max 3)</FormLabel>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {subjectsOptions.map(s => (
                                    <Button key={s} size="small" variant={subjects.includes(s) ? 'contained' : 'outlined'} onClick={() => toggleSubject(s)} sx={{ textTransform: 'none' }}>{s}</Button>
                                ))}
                            </Box>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel component="legend" sx={{ mb: 1 }}>Skill set you have (comma separated)</FormLabel>
                        <TextField fullWidth multiline minRows={2} placeholder="e.g. sketching, teamwork, basic coding" value={skills} onChange={e => setSkills(e.target.value)} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ minWidth: 160 }}>
                            <FormLabel component="legend" sx={{ mb: 1 }}>Age group</FormLabel>
                            <Select value={ageGroup} onChange={e => setAgeGroup(e.target.value)}>
                                <MenuItem value="6-9">6 - 9</MenuItem>
                                <MenuItem value="10-14">10 - 14</MenuItem>
                                <MenuItem value="15-18">15 - 18</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
                            <Button variant="contained" onClick={submit}>Save & Continue</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
