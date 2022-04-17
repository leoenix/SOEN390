import React from 'react';
import { Container, Box, Grid, CssBaseline, styled, Paper, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Axios from 'axios';
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
}));


function PreviousSymptoms() {
    const location = useLocation(); //get data passed on through previous page (DoctorPatientProfile page)
    const [patientData, setPatientData] = useState([]); //Patient data used in rendering of page
    const [healthInfo, setHealthInfo] = useState(new Array(2).fill(false)); // list of symptom forms
    const [formIndex, setFormIndex] = useState(0); // wanted index of form
    let stopeffect = 1;
    let healthValues = ['PlaceHolder','None', 'Slight', 'Moderate', 'Severe', 'Extreme'] // list of health values that patient filled (stored as int)

    useEffect(() => { //When page is loaded, get requests will get patient data
        Axios.get("http://localhost:8080/doctorViewingPatientData", {params: {id: location.state.ID}, withCredentials:true}).then((response) => {


            setPatientData(response.data);
        }); // finding all previous symptom forms from patient and finding the most recent
        Axios.get("http://localhost:8080/doctorViewingPreviousSymptoms", {params: {id: location.state.ID}, withCredentials:true}).then((response) => {
            console.log(response);
            setHealthInfo(response.data);
            setFormIndex(response.data.length - 1);
        });

    }, [stopeffect]);

    return (
        <>
            {
                localStorage.getItem("role") != ('Doctor' || 'Admin') && <Navigate to={"/"} refresh={true} />
            }
            <Container component="main">
                <CssBaseline />
                {patientData.map((val) => {
                    // changing the form index when select is changed
                    function handleChange(event) {
                        setFormIndex(event.target.value);
                    }

                    return (
                        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Typography component="h1" variant="h2">
                                Symptom form
                            </Typography>
                            {/* Displays the first block related to health info */}
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                    <Typography component="h1" variant="h5">
                                        Health
                                        information {healthInfo.length > 0 && moment(healthInfo[formIndex].InfoTimestamp).utc().format('MMM Do, YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Patient Name:<br /> {val.Fname + " " + val.Lname}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Patient ID:<br /> {val.ID}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Other:<br /> {healthInfo.length > 0 && healthInfo[formIndex].Other}
                                    </Item>
                                </Grid>
                            </Grid>
                            {/* Displays the second block related to health info */}
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Weight:<br /> {healthInfo.length > 0 && healthInfo[formIndex].Weight}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Temperature:<br /> {healthInfo.length > 0 && healthInfo[formIndex].Temperature}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Breathing:<br /> {healthInfo.length > 0 && healthValues[healthInfo[formIndex].Breathing]}
                                    </Item>
                                </Grid>
                            </Grid>
                            {/* Displays the third block related to health info */}
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Chest
                                        Pain:<br /> {healthInfo.length > 0 && healthValues[healthInfo[formIndex].Chest_Pain]}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Fatigue:<br /> {healthInfo.length > 0 && healthValues[healthInfo[formIndex].Fatigue]}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Taste:<br /> {healthInfo.length > 0 && healthValues[healthInfo[formIndex].Taste]}
                                    </Item>
                                </Grid>
                            </Grid>
                            {/* Displays the last block related to more health info */}
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Fever:<br /> {healthInfo.length > 0 && healthValues[healthInfo[formIndex].Fever]}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Cough:<br /> {healthInfo.length > 0 && healthValues[healthInfo[formIndex].Cough]}
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Item>
                                        Smell:<br /> {healthInfo.length > 0 && healthValues[healthInfo[formIndex].Smell]}
                                    </Item>
                                </Grid>
                            </Grid> <br />
                            <Box>
                                {/* select to change which form is wanted */}
                                <FormControl fullwidth>
                                    <InputLabel>Form on date</InputLabel>
                                    <Select xs={12} sm={3} sx={{ margin: 1 }}
                                        disabled={healthInfo.length < 1}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formIndex}
                                        label="Form on date"
                                        onChange={handleChange}
                                    >
                                        {healthInfo.length > 0 && healthInfo.map((val, index) => {
                                            return (
                                                <MenuItem
                                                    value={index}>{moment(healthInfo[index].InfoTimestamp).utc().format('MMM Do, YYYY')}</MenuItem>
                                            );
                                        })}
                                    </Select> </FormControl></Box>
                        </Box>
                    );
                })}
            </Container>
        </>
    );
}

export default PreviousSymptoms;