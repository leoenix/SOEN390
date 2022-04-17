import React from 'react';
import {Container, Box, Grid, CssBaseline, Button, styled, Paper, Typography} from '@mui/material';
import Axios from 'axios';
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState} from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  fontWeight: 'bold',
}));

function HealthOfficialViewingPatient() {
    const location = useLocation(); //get data passed on through previous page (HealthOfficialPatientProfile page)
    const [patientData, setPatientData] = useState([]); //Patient data used in rendering of page

    let stopeffect = 1;
    
    useEffect(()=>{ //When page is loaded, get requests will get patient data as well as a list of patients whose profiles have been viewed
        Axios.get("http://localhost:8080/doctorViewingPatientData", { params: {id: location.state.ID}, withCredentials:true}).then((response) => {
            setPatientData(response.data);
        });   
    }, [stopeffect]); 

  let stopEffect = 1;


    let previousSymptoms = () => { //This function gets the list of all the patients previous symptom forms (to be rendered on a page in later sprint)
        Axios.get("http://localhost:8080/doctorViewingPreviousSymptoms", { params: {id: location.state.ID}, withCredentials:true}).then((response) => {
            console.log("success");
        });  
    }

    let flagPatient = () => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/flagPatient", {
            PatientID: location.state.ID,
            FlagPriority: 3
        },{withCredentials: true}).then(()=>{
            console.log("success")
        });
    }

  let isFlagged = false; //variable to verify if patient has already been flagged, to be used for displaying either the FLAG or UNFLAG butttons
  let isFlaggedArray = patientData.map((val, key) => {
    return val.Flagged;
  });
  if (isFlaggedArray[0] !== 0) {
    isFlagged = true;
  }

  return (
    <>
      {localStorage.getItem('role') !== ('Health Official' || 'Admin') && (
        <Navigate to={'/'} refresh={true} />
      )}
      <Container component='main'>
        <CssBaseline />
        {patientData.map((val, key) => {
          return (
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component='h1' variant='h2'>
                Patient Profile
              </Typography>
              {/* Displays the first block related to Patient Information */}
              <Grid container spacing={2} sx={{ mt: 5 }}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography component='h1' variant='h5'>
                    Medical Information
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    Patient Name:
                    <br /> {val.Fname + ' ' + val.Lname}
                  </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    Patient ID:
                    <br /> {val.ID}
                  </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    Covid-19 Status:
                    <br /> {val.Status}
                  </Item>
                </Grid>
              </Grid>
              {/* Displays the second block related to Patient Information */}
              <Grid container spacing={2} sx={{ mt: 5 }}>
                <Grid item xs={12} md={4}>
                  <Item>
                    Doctor:
                    <br /> {val.DoctorFirst + ' ' + val.DoctorLast}
                  </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    Email:
                    <br /> {val.Email}
                  </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    Phone Number:
                    <br /> {val.Phone}
                  </Item>
                </Grid>
              </Grid>
              {/* Displays the third block related to Patient Information */}
              <Grid container spacing={2} sx={{ mt: 5 }}>
                <Grid item xs={12} md={6}>
                  <Item>
                    Birthday:
                    <br />{' '}
                    {val.Birthday
                      ? val.Birthday.substring(0, 10)
                      : '19/19/1999'}
                  </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item>
                    Address:
                    <br /> {val.Address}
                  </Item>
                </Grid>
              </Grid>
              {/* Displays the last block related to the clickable buttons */}
              <Box sx={{ mt: 10 }}>
                <Grid container fullwidth spacing={1}>
                  {/* Displaying the appropriate button base on if the patient is flagged or not */}
                  {isFlagged ? (
                    <Button
                      xs={12}
                      sm={3}
                      sx={{ margin: 1 }}
                      disabled
                      variant='contained'
                      onClick={flagPatient}
                      href='/ImmigrationOfficerPatientProfile'
                    >
                      FLAG PATIENT
                    </Button>
                  ) : (
                    <Button
                      xs={12}
                      sm={3}
                      sx={{ margin: 1 }}
                      variant='contained'
                      onClick={flagPatient}
                      href='/ImmigrationOfficerPatientProfile'
                    >
                      FLAG PATIENT
                    </Button>
                  )}
                </Grid>
              </Box>
            </Box>
          );
        })}
        ;
      </Container>
    </>
  );
}

export default HealthOfficialViewingPatient;