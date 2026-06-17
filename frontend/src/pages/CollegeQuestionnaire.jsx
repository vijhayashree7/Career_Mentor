import { Box, Button, Grid, Paper, Typography, FormControl, FormLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, Alert, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CollegeQuestionnaire() {
    const navigate = useNavigate();
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeError, setResumeError] = useState('');
    const [qualification, setQualification] = useState('Undergraduate');
    const [fieldOfStudy, setFieldOfStudy] = useState('Engineering');
    const [aspiration, setAspiration] = useState('');
    const [currentYear, setCurrentYear] = useState('1');
    const [passoutYear, setPassoutYear] = useState('');
    const [interests, setInterests] = useState([]);
    const [skills, setSkills] = useState('');

    const fieldInterestMap = {
        Engineering: ['Backend Development', 'Frontend Development', 'DevOps', 'SRE', 'AWS', 'Azure', 'GCP', 'Embedded Systems', 'Robotics', 'AI/ML', 'Data Science', 'Security', 'Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Software Development'],
        Medicine: ['Clinical Research', 'Pharmacy', 'Public Health', 'Biomedical Research', 'Surgery', 'Diagnostics'],
        Law: ['Corporate Law', 'Criminal Law', 'Intellectual Property', 'Human Rights', 'Environmental Law'],
        'Arts & Humanities': ['Literature', 'History', 'Philosophy', 'Sociology', 'Languages', 'Design'],
        Commerce: ['Accounting', 'Finance', 'Economics', 'Business Analytics', 'Marketing'],
        Science: ['Physics', 'Chemistry', 'Biology', 'Research', 'Data Analysis'],
        Management: ['HR', 'Operations', 'Strategy', 'Consulting', 'Entrepreneurship'],
        Design: ['UX/UI', 'Product Design', 'Graphic Design', 'Industrial Design'],
        Education: ['Teaching', 'Educational Research', 'Curriculum Development'],
        Agriculture: ['AgriTech', 'Food Science', 'Soil Science'],
        General: ['AI/ML', 'Web Development', 'Data Science', 'Design', 'Business', 'Research', 'Cloud', 'Security']
    };

    const interestOptions = fieldInterestMap[fieldOfStudy] || fieldInterestMap['General'];
    const [errors, setErrors] = useState({});

    const years = (() => {
        const y = new Date().getFullYear();
        const arr = [];
        for (let i = y; i <= y + 6; i++) arr.push(i.toString());
        return arr;
    })();

    function handleFile(e) {
        setResumeError('');
        setErrors(prev => ({ ...prev, resume: '' }));
        const f = e.target.files[0];
        if (!f) return setResumeFile(null);
        const name = (f.name || '').toLowerCase();
        if (f.type !== 'application/pdf') {
            setResumeError('Please upload a PDF file.');
            setResumeFile(null);
            return;
        }
        if (!name.includes('resume') && !name.includes('cv')) {
            setResumeError('Filename does not look like a resume (should include "resume" or "cv").');
            setResumeFile(null);
            return;
        }
        setResumeFile(f);
    }

    const toggleInterest = (opt) => {
        if (interests.includes(opt)) setInterests(interests.filter(x => x !== opt));
        else setInterests(prev => [...prev, opt]);
        setErrors(prev => ({ ...prev, interests: '' }));
    };

    const submit = () => {
        const newErrors = {};
        if (!resumeFile) newErrors.resume = 'Please upload a valid PDF resume.';
        if (!qualification) newErrors.qualification = 'Please select qualification.';
        if (!fieldOfStudy) newErrors.fieldOfStudy = 'Please select field of study.';
        if (!currentYear) newErrors.currentYear = 'Please select current year.';
        if (!passoutYear) newErrors.passoutYear = 'Please select expected passout year.';
        if (!interests || interests.length === 0) newErrors.interests = 'Please select at least one area of interest.';
        if (!skills || skills.trim().length === 0) newErrors.skills = 'Please enter at least one skill.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if (newErrors.resume) setResumeError(newErrors.resume);
            return;
        }

        const payload = { resumeFileName: resumeFile.name, qualification, fieldOfStudy, aspiration, currentYear, passoutYear, interests, skills };
        localStorage.setItem('collegeProfile', JSON.stringify(payload));
        navigate('/dashboard');
    };

    return (
        <Box sx={{ maxWidth: 980, mx: 'auto', py: 6 }}>
            <Paper sx={{ px: { xs: 3, md: 6 }, py: { xs: 3, md: 5 }, background: 'rgba(255,255,255,0.95)' }} elevation={3}>
                <Typography variant="h4" mb={1}>College Student Profile</Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.resume} sx={{ mb: 2 }}>
                            <FormLabel sx={{ mb: 1 }}>Upload your resume (PDF only)</FormLabel>
                            <input accept=".pdf" type="file" onChange={handleFile} style={{ marginTop: 8 }} />
                            {resumeError && <FormHelperText error sx={{ mt: 1 }}>{resumeError}</FormHelperText>}
                            {resumeFile && !resumeError && <FormHelperText sx={{ mt: 1, color: 'success.main' }}>{resumeFile.name} ready</FormHelperText>}
                        </FormControl>

                        <Box sx={{ mt: 3 }}>
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.qualification}>
                                <FormLabel>Qualification</FormLabel>
                                <Select value={qualification} onChange={e => { setQualification(e.target.value); setErrors(prev => ({ ...prev, qualification: '' })); }}>
                                    <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                                    <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                                    <MenuItem value="Diploma">Diploma</MenuItem>
                                    <MenuItem value="PhD">PhD</MenuItem>
                                </Select>
                                {errors.qualification && <FormHelperText>{errors.qualification}</FormHelperText>}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.fieldOfStudy}>
                                <FormLabel>Field of study</FormLabel>
                                <Select value={fieldOfStudy} onChange={e => { setFieldOfStudy(e.target.value); setInterests([]); setErrors(prev => ({ ...prev, fieldOfStudy: '' })); }}>
                                    <MenuItem value="Engineering">Engineering</MenuItem>
                                    <MenuItem value="Medicine">Medicine</MenuItem>
                                    <MenuItem value="Law">Law</MenuItem>
                                    <MenuItem value="Arts & Humanities">Arts & Humanities</MenuItem>
                                    <MenuItem value="Commerce">Commerce</MenuItem>
                                    <MenuItem value="Science">Science</MenuItem>
                                    <MenuItem value="Management">Management</MenuItem>
                                    <MenuItem value="Design">Design</MenuItem>
                                    <MenuItem value="Education">Education</MenuItem>
                                    <MenuItem value="Agriculture">Agriculture</MenuItem>
                                    <MenuItem value="General">General</MenuItem>
                                </Select>
                                {errors.fieldOfStudy && <FormHelperText>{errors.fieldOfStudy}</FormHelperText>}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <FormLabel>What would you like to become? (optional)</FormLabel>
                                <TextField placeholder="e.g. Software Engineer, Researcher, Designer" value={aspiration} onChange={e => setAspiration(e.target.value)} sx={{ mt: 1 }} />
                            </FormControl>

                            <Box>
                                <FormControl fullWidth error={!!errors.currentYear} sx={{ mb: 2 }}>
                                    <FormLabel>Current year of study</FormLabel>
                                    <Select value={currentYear} onChange={e => { setCurrentYear(e.target.value); setErrors(prev => ({ ...prev, currentYear: '' })); }}>
                                        <MenuItem value="1">1st year</MenuItem>
                                        <MenuItem value="2">2nd year</MenuItem>
                                        <MenuItem value="3">3rd year</MenuItem>
                                        <MenuItem value="4">4th year</MenuItem>
                                        <MenuItem value="5">5th year</MenuItem>
                                    </Select>
                                    {errors.currentYear && <FormHelperText>{errors.currentYear}</FormHelperText>}
                                </FormControl>

                                <FormControl fullWidth error={!!errors.passoutYear}>
                                    <FormLabel>Expected passout year</FormLabel>
                                    <Select value={passoutYear} onChange={e => { setPassoutYear(e.target.value); setErrors(prev => ({ ...prev, passoutYear: '' })); }}>
                                        <MenuItem value="">Select</MenuItem>
                                        {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                                    </Select>
                                    {errors.passoutYear && <FormHelperText>{errors.passoutYear}</FormHelperText>}
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>


                    <Grid item xs={12}>
                        <FormControl component="fieldset" fullWidth error={!!errors.interests} sx={{ mb: 2 }}>
                            <FormLabel sx={{ mb: 1 }}>Areas of interest</FormLabel>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {interestOptions.map(opt => (
                                    <FormControlLabel key={opt} control={<Checkbox checked={interests.includes(opt)} onChange={() => toggleInterest(opt)} />} label={opt} />
                                ))}
                            </Box>
                            {errors.interests && <FormHelperText error>{errors.interests}</FormHelperText>}
                        </FormControl>

                        <Box sx={{ mt: 1 }}>
                            <FormLabel>Skill set you have (comma separated)</FormLabel>
                            <TextField fullWidth multiline minRows={3} placeholder="e.g. Python, React, SQL" value={skills} onChange={e => { setSkills(e.target.value); setErrors(prev => ({ ...prev, skills: '' })); }} sx={{ mt: 1 }} error={!!errors.skills} helperText={errors.skills || ''} />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
                            <Button variant="contained" onClick={submit}>Save & Continue</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
