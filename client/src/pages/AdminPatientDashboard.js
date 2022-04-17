import {Container,Button,CardHeader,Avatar,IconButton,Typography,Grid,Paper,Box,Card,styled,Autocomplete,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';

//Paper Styling for Tiles
const TilePaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

{/*
//Paper Styling for Inactive Accounts
const InactivePaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: '#d3d3d3',
}));

//Paper Styling for Urgent Accounts
const UrgentPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'red',
}));
*/}

function AdminPatientDashboard() {
  //Constants for Patients and Doctors Lists
  const [patientList, setPatientList] = useState([]); //all patient info
  const [filteredPatientList, setFilteredPatientList] = useState([]); //all patient info
  const [availableDoctorsList, setMostToLeastPatients] = useState([]); //list of doctors, most available to least

  // Constants for Dialog Box for Reassigingng Patients
  const [open, setOpen] = React.useState(false); //state opens dialog box
  const [newDocID, setNewDocID] = React.useState(false); //tracks ID of Doctor toChange
  const [patientIDToChange, setPatientID] = React.useState(false); // tracks ID of Patient to Change
  const [formfilled, setFilled] = React.useState(false); //Staus if required fields in form are filled

  //sets open state for dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  //sets close state for dialog box
  const handleClose = () => {
    setOpen(false);
  };

  //sets ID of Doctor toChange
  const changeToNewDoc = (value) => {
    setNewDocID(value.value);
    setFilled(true);
    //console.log(value.label + value.value);
  };

  //sets ID of Patient toChange
  const changePatientDoc = (value) => {
    setPatientID(value);
    //console.log(value);
  };

  //If cancelled dialog box, reset form vallidator
  const clearKeys = () => {
    setFilled(false);
  };

  //function on submission to updtae databse with new doctor for a patient
  const updatePatientDoctor = () => {
    //console.log(formfilled);
    if (formfilled === true) {
      reassignPatient(newDocID, patientIDToChange);
    } else {
      alert('Please select a doctor to reassign patient to.');
    }
    setFilled(false);
   };

   //Data JSON Array of Doctor Names and IDs 
  const options = 
    availableDoctorsList.map((val, key) => 
      ({
        label: val.Fname + ' '+ val.Lname,
        value: val.ID
      })
    )
  ;

  function getPatients() { //this function will return all information associated to patients
    Axios.get("http://localhost:8080/adminViewingPatientData",{withCredentials: true}).then((response) => {
      setPatientList(response.data);
      setFilteredPatientList(response.data);
      // console.log("Patients:");
      // console.log(response.data);
    });
  };

  function getDoctorMostAvailable() { //this function will return doctors sorted by the most available
    Axios.get("http://localhost:8080/mostToLeastPatients",{withCredentials: true}).then((response) => {
      setMostToLeastPatients(response.data);
      console.log("Doctors Most Available :");
      console.log(response.data);
    });
  };

  let reassignPatient = (docID, patientID) => { //This function will update the patient with the reassigned doctor and make changes in the tables to reflect the reassignment.
    Axios.post("http://localhost:8080/reassignPatient", {
      DoctorID: docID,
      PatientID: patientID
    },{withCredentials: true}).then(() => {
      //console.log("successfully updated patient!")
    });
    window.location.reload(false);
  };

  let stopeffect = 1;

  useEffect(() => {
    //functions executed upon page render
    getPatients();
    getDoctorMostAvailable();
  }, [stopeffect]);

  return (
    <>
      {localStorage.getItem('role') !== 'Admin' && (
        <Navigate to={'/'} refresh={true} />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <CardHeader
          avatar={<Avatar aria-label=''></Avatar>}
          action={<IconButton aria-label=''></IconButton>}
          title='Welcome Admin'
          subheader='Admin'
        />
        {/* Title Patient Block and Standard Grid Sizing */}
        <Container maxWidth='md' sx={{ pb: '2%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
                <Typography variant='body1' color='initial'>
                  Patients
                </Typography>
              </Card>
            </Grid>
          </Grid>
          {/* Grid Sizing for Patient Paper Tiles */}
          <Grid container spacing={2}>
            {filteredPatientList.map((val, key) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={key}>
                  <TilePaper>
                    <CardHeader
                      avatar={<Avatar aria-label=''>P{key}</Avatar>}
                      action={<IconButton aria-label=''></IconButton>}
                      title={val.Fname + ' ' + val.Lname}
                      subheader={`Doctor: ${val.docFname} ${val.docLname}`}
                    />
                    <Typography
                      variant='body2'
                      display='block'
                      gutterBottom
                      sx={{ marginLeft: '20%' }}
                    >
                      Contact: {val.Phone}
                    </Typography>
                    <Button
                      sx={{ marginLeft: '20%' }}
                      variant='contained'
                      color='primary'
                      onClick={() => {
                        handleClickOpen();
                        changePatientDoc(val.ID);
                      }}
                    >
                      REASSIGN
                    </Button>
                  </TilePaper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
        {/* Alert Box for reassigning Patients */}
        <Dialog open={open} onClose={handleClose} fullScreen>
          <DialogTitle>Reassign Patient</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ pb: '2%' }}>
              Select a doctor to reassign the selected patient to.
            </DialogContentText>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={options}
              sx={{ height: '80%' }}
              renderInput={(params) => (
                <TextField {...params} label='Doctor' required />
              )}
              onChange={(event, value) => changeToNewDoc(value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                clearKeys();
              }}
            >
              CANCEL
            </Button>
            <Button
              onClick={() => {
                handleClose();
                updatePatientDoctor();
              }}
            >
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
      </Box>{' '}
    </>
  );
}
export default AdminPatientDashboard;
