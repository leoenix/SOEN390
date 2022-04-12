import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, CssBaseline, Button, styled, Paper, Typography } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";

//Styling for the Item tag
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
}));

function PatientProfile() {
    //These variables are used to get the current patient's data.
    //The const allows us to store the data in a variable using useState()
    //and the stopEffect will make sure that our useEffect() will only 
    //run one time.
    const [patientData, setPatientData] = useState([]);
    let stopEffect = 1;

    //This useEffect() will run after the page renders. It will
    //get the patients data by using a get and going to the 
    //server.js file to execute the code to query for the data.
    useEffect(() => {
        Axios.get('http://localhost:8080/patientProfileData', { withCredentials: true, params: { id: localStorage.getItem('id') } }).then((response) => {
            setPatientData(response.data);
            console.log(response);
        })
    }, [stopEffect]);

    let requestChat = () => { //When clicking the REQUEST CHAT button, this will update the ChatRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/RequestChat", {
            patientid: localStorage.getItem('id')
        }).then(() => {
            console.log("success");
            window.location.href = "/PatientProfile";

        });
    }

    let isChatRequested = false; //variable to verify if patient has requested to chat, to be used for disabling or enabling REQUEST CHAT button
    let isChatRequestedArray = patientData.map((val, key) => { return val.ChatRequested });
    if (isChatRequestedArray[0] === 1) {
        isChatRequested = true;
    }


    let chatGranted = false; //variable to verify if patient has permission to chat with doctor, to be used for disabling or enabling OPEN CHAT button
    let chatGrantedArray = patientData.map((val, key) => { return val.ChatPermission });
    if (chatGrantedArray[0] === 1) {
        chatGranted = true;
    }

    // Returning the HTML / CSS for the Patient Profile
    // Each GRID ITEM retrieves patient data from the database
    // and displays it.
    // Each button on the page brings you to the associated pages
    return (
        <>
            {
                localStorage.getItem("role") != 'Patient' && <Navigate to={"/"} refresh={true} />
            }

            <Container component="main" >
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Typography component="h1" variant="h2">
                        Patient Profile
                    </Typography>
                    {/* Displays the first block related to Medical Information */}
                    <Box sx={{ mt: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Typography component="h1" variant="h5">
                                    Medical Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Name:<br /> {patientData.map((val, key) => { return " " + val.FName + " " + val.LName })}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Patient ID:<br />{patientData.map((val, key) => { return " " + val.ID })}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Doctor:<br />{patientData.map((val, key) => { return " " + val.DFName + " " + val.DLName })}
                                </Item>
                            </Grid>
                        </Grid>
                        {/* Displays the second block related to Patient Information */}
                        <Grid container spacing={2} sx={{mt: 7}}>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Typography component="h1" variant="h5">
                                    General Patient Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Birthdate:<br />{patientData.map((val, key) => { return " " + new Date (val.Birthday).getFullYear() +"-" +  (new Date (val.Birthday).getMonth()+1) + "-" +  new Date (val.Birthday).getDate() })}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Health Insurance:<br /> {patientData.map((val, key) => { return " " + val.HealthInsurance })}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Email Address:<br />{patientData.map((val, key) => { return " " + val.Email })}
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* Displays the third block related to the clickable buttons */}
                    <Box sx={{ mt: 10 }}>
                        <Grid container fullwidth spacing={1}>
                            <Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" href="/EditInfoForm" >
                                EDIT INFO
                            </Button>
                            <Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" href="/PatientCovidStatus" >
                                Edit CURRENT STATUS
                            </Button>
                            <Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" href="/SymptomForm">
                                SYMPTOM FORM
                            </Button>
                            <Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" target="_blank" href="https://www.quebec.ca/en/health/health-issues/a-z/2019-coronavirus/measures-in-force/about-the-measures-in-force">
                                COVID-19 MEASURES
                            </Button>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <Grid container fullwidth spacing={1}>
                            <Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" href="/PatientFiles">
                                Upload File
                            </Button>
                            <Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" href="/PatientAppointment" >
                                BOOK APPOINTMENT
                            </Button>
                            {/* This will display the approriate button based on this users status in the database */}
                            {(isChatRequested || chatGranted) ? (<Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" disabled>CHAT REQUESTED</Button>) :
                                (<Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" onClick={requestChat} >REQUEST CHAT</Button>)}
                            {chatGranted ? (<Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" href="/LiveChatPatient">OPEN CHAT</Button>) :
                                (<Button xs={12} sm={6} md={3} sx={{ margin: 1 }} variant="contained" disabled> OPEN CHAT</Button>)}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
export default PatientProfile;