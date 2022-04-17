import * as React from 'react';
import {Avatar, IconButton, Button, Box, Grid, CardHeader, Typography} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, Navigate} from 'react-router-dom';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AnnouncementIcon from '@mui/icons-material/Announcement';

function DoctorPatientProfile() {
  const [patientList, setPatientList] = useState([]); //all patient info
  const [filteredPatients, setFilteredPatients] = useState([]); //filtered values for patient info
  const [executed, setExecuted] = useState(false); //keeps track of if getPatients() method is called
  const [viewedList, setViewedList] = useState([]); //Patients whose profiles have been reviewed by a doctor
  var tempDoctorID = parseInt(localStorage.getItem('id'));

  const filterMyPatients = () => { //this function will set the useState filteredPatients to show ALL patients
    setFilteredPatients(myPatients)
  };

  const filterAllPatients = () => { //this function will set the useState filteredPatients to show the patients assigned specifically to the doctor who is logged in
    setFilteredPatients(allPatients)
  };

  var myPatients = patientList.filter(e => e.DoctorID === tempDoctorID); //returns a filtered list of patients that are assigned to the doctor
  var allPatients = patientList; //returns all patients

  function getPatients() { //this function is called when the doctor patient profile page is loaded. It sets the useState patientList to the query result for patient info
    Axios.get("http://localhost:8080/DoctorPatientProfile",{withCredentials: true}).then((response) => {
      setPatientList(response.data);
      console.log(patientList);
      if (!executed) {
        setFilteredPatients(response.data);
        setExecuted(true);
      }
    }).catch(console.log('err'));
  };

  const getViewed = () => { //this function is called when the doctor patient profile page is loaded. It sets the useState patientList to the query result for patient info
    Axios.get("http://localhost:8080/Viewed",{withCredentials: true}).then((response) => {
      setViewedList(response.data);
    }).catch(console.log('err'));
  };

  let stopeffect = 1;

  useEffect(() => { //After the page is rendered, the two functions getPatients() and getViewed() are called once
    getPatients();
    getViewed();
  }, [stopeffect]);

  return (
    <>
      {
        (localStorage.getItem('role') !== 'Doctor' && localStorage.getItem('role') !== 'Admin')&& <Navigate to={'/'} refresh={true} />
      }
      <div>
        <Box sx={{ padding: 5 }}>
          <Typography component='h1' variant='h2'>Patient List
            {/* Buttons allow you to switch from your patiens to all patients */}
            <Button value='All Patients' name='All Patients' variant='contained' onClick={() => filterAllPatients()} sx={{ textAlign: 'right', ml: 1, display: 'inline-block', float: 'right' }}>
              All Patients
            </Button>
            <Button value='My Patients' name='My Patients' variant='contained' onClick={() => filterMyPatients()} sx={{ textAlign: 'right',  display: 'inline-block', float: 'right' }}>
              My Patients
            </Button>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, padding: 5 }} textAlign='left'>
          <Grid container spacing={2} columns={12}>
            {/* Runs a loop for each patient in the database */}
            {filteredPatients.map((val, key) => {
              let isFlagged = val.Flagged; //checks if patient has been flagged
              let isViewed = false; //patient health information is not viewed unless doctor specifies
              if (viewedList.map(el => el.ID).includes(val.ID)) { //if the PatientID is present in the list of Viewed Patients then set isViewed to true
                isViewed = true;
              }
              let isChatRequested = false;
              if (val.ChatRequested === 1 && val.DoctorID === tempDoctorID) {
                isChatRequested = true;
              }
              let isPatientNew = false;
              if (val.NewPatient === 1 && val.DoctorID === tempDoctorID) {
                isPatientNew = true;
              }

              return (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  {/* The link tag creates the box in the display */}
                  <Link to='/DoctorViewingPatient' state={{ ID: val.ID }} style={{ textDecoration: 'none' }}>
                    <Button variant='outlined' href='/DoctorViewingPatient' fullWidth>
                      <CardHeader fullwidth avatar={ 
                        // Avatar for each patient
                          <Avatar aria-label=''> 
                            P{key}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label=''></IconButton>
                        }
                        title={val.Fname + ' ' + val.Lname} //name of patient from db
                        subheader={val.Status} //status of patient from db
                      />

                      {isViewed ? (<VisibilityIcon />) : (<VisibilityOutlinedIcon />)} {/* If a patients health information has been reviewed the eye icon will be filled */}

                      {isFlagged === 3 ? (<FlagIcon color = 'secondary' />) : isFlagged === 2 ? (<FlagIcon sx={{color: '#EFD000'}} />):
                          isFlagged === 1 ? (<FlagIcon sx={{color: '#00F700'}} />) : (<FlagOutlinedIcon />)} {/* If a patient is flagged the flag icon will be red */}
                      {isChatRequested ? (<AnnouncementIcon />) : (<AnnouncementIcon sx={{ visibility: 'hidden' }} />)}
                      {isPatientNew ? (<FiberNewIcon />) : (<FiberNewIcon sx={{ visibility: 'hidden' }} />)}

                    </Button>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {/* Feature not yet implemented */}
        <Box sx={{ padding: 5}}>
          <Button variant='contained' href='#outlined-buttons' sx={{ textAlign: 'right',  display: 'inline-block', float: 'right' }}>
            Review Medical Checklist
          </Button>
        </Box>
      </div>
    </>
  );
}
export default DoctorPatientProfile;