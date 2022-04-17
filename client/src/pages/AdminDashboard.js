import { Container, Button, CardHeader, Avatar, IconButton, Typography, Grid, Paper, Card, Box, styled} from '@mui/material';
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
*/}

//Paper Styling for Urgent Accounts
const UrgentPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'red',
}));

function AdminDashboard() {

  const [doctorListValidated, setDoctorListValidated] = useState([]); //all doctor info
  const [doctorListUnvalidated, setDoctorListUnvalidated] = useState([]); //all doctor info
  const [healthOfficialListValidated, setHealthOfficialListValidated] = useState([]); //all validated health official info
  const [healthOfficialListUnvalidated, setHealthOfficialListUnvalidated] = useState([]); //all unvalidated health official info
  const [immigrationOfficerListValidated, setImmigrationOfficerListValidated] = useState([]); //all validated immigration officer info
  const [immigrationOfficerListUnvalidated, setImmigrationOfficerListUnvalidated] = useState([]); //all unvalidated immigration officer info
  
  function getValidatedDoctors() { //this function will return all information associated to validated doctors
    Axios.get("http://localhost:8080/adminViewingValidatedDoctorData",{withCredentials:true}).then((response) => {
      setDoctorListValidated(response.data);
      //console.log('Validated Doctors:');
      //console.log(response.data);
    });
  };

  function getUnvalidatedDoctors() { //this function will return all information associated to unvalidated doctors
    Axios.get("http://localhost:8080/adminViewingUnvalidatedDoctorData",{withCredentials:true}).then((response) => {
      setDoctorListUnvalidated(response.data);
      // console.log('Unvalidated Doctors:');
      // console.log(response.data);
    });
  };

  function getValidatedHealthOfficials() { //this function will return all information associated to validated health officials
    Axios.get("http://localhost:8080/adminViewingValidatedHealthOfficalData",{withCredentials: true}).then((response) => {
      setHealthOfficialListValidated(response.data);
      // console.log('Validated HO:');
      // console.log(response.data);
    });
  };

  function getUnvalidatedHealthOfficials() {//this function will return all information associated to unvalidated health officials
    Axios.get("http://localhost:8080/adminViewingUnvalidatedHealthOfficalData",{withCredentials: true}).then((response) => {
      setHealthOfficialListUnvalidated(response.data);
      // console.log('Unvalidated HO:');
      // console.log(response.data);
    });
  };

  function getValidatedImmigrationOfficers() { //this function will return all information associated to validated immigration officials
    Axios.get("http://localhost:8080/adminViewingValidatedImmigrationOfficerData",{withCredentials: true}).then((response) => {
      setImmigrationOfficerListValidated(response.data);
      // console.log('Validated IO:');
      // console.log(response.data);
    });
  };

  function getUnvalidatedImmigrationOfficers() { //this function will return all information associated to unvalidated immigration officials
    Axios.get("http://localhost:8080/adminViewingUnvalidatedImmigrationOfficerData",{withCredentials: true}).then((response) => {
      setImmigrationOfficerListUnvalidated(response.data);
      // console.log('Unvalidated IO:');
      // console.log(response.data);
    });
  };

  let validateDoctor = (ID) => { //this function will validate doctors on click
    Axios.post('http://localhost:8080/validateDoctor', {
      DoctorID: ID
    },{withCredentials:true}).then(() => {
      //console.log("successfully validated doctor!")
    });
    window.location.reload(false);
  };

  let invalidateDoctor = (ID) => {
    //This function will update the validate attribute in the users table
    if (
      !window.confirm(
        "Are you sure you would like to deny this account? This will permanently delete the account from the system and inform the contact by email."
      )
    ) {
      return;
    }

    Axios.post("http://localhost:8080/invalidateDoctor", { //This request will invalidate a doctor
      DoctorID: ID
    },{withCredentials: true}).then(() => {
      //console.log("successfully invalidated doctor!")
    });
    window.location.reload(false);
  };

  let validateHO = (ID) => { //this function will validate health officials on click
    Axios.post('http://localhost:8080/validateHealthOfficial', {
      HealthOfficialID: ID
    },{withCredentials: true}).then(() => {
      //console.log('successfully validated health official!')
    });
    window.location.reload(false);
  };

  let invalidateHO = (ID) => { //This function will update the validate attribute in the users table
    if (!window.confirm('Are you sure you would like to deny this account? This will permanently delete the account from the system and inform the contact by email.')) {
      return;
    }

    Axios.post('http://localhost:8080/invalidateHealthOfficial', { //This request will invalidate a health official
      HealthOfficialID: ID
    },{withCredentials: true}).then(() => {
      //console.log("successfully invalidated health official!")
    });
    window.location.reload(false);
  };

  let validateIO = (ID) => { //this function will validate immigration officers on click
    Axios.post('http://localhost:8080/validateImmigrationOfficer', {
      ImmigrationOfficerID: ID
    },{withCredentials: true}).then(() => {
      //console.log("successfully validated immigration officer!")
    });
    window.location.reload(false);
  };
  
  let invalidateIO = (ID) => { //This function will update the validate attribute in the users table
    if (!window.confirm('Are you sure you would like to deny this account? This will permanently delete the account from the system and inform the contact by email.')) {
      return;
    }

    Axios.post('http://localhost:8080/invalidateImmigrationOfficer', { //This request will invalidate a immigration officer
      ImmigrationOfficerID: ID
    },{withCredentials: true}).then(() => {
      //console.log("successfully invalidated immigration officer!")
    });
    window.location.reload(false);
  };

  function sendEmail() { //Feature to be implemented soon
    Axios.post("http://localhost:8080/sendEmail",{withCredentials: true}).then(() => {
      //console.log("Sent Email!")
    });
  }


  let stopeffect = 1;

  useEffect(() => { //functions executed upon page render
    getValidatedDoctors();
    getUnvalidatedDoctors();
    getValidatedHealthOfficials();
    getUnvalidatedHealthOfficials();
    getValidatedImmigrationOfficers();
    getUnvalidatedImmigrationOfficers();
    //sendEmail();

  }, [stopeffect]);

  return (
    <>
      {
        localStorage.getItem('role') !== 'Admin' && <Navigate to={'/'} refresh={true} />
      }
     <Box sx={{flexGrow: 1}}> 
      <CardHeader
        avatar={
          <Avatar aria-label=''>
          </Avatar>
        }
        action={
          <IconButton aria-label=''></IconButton>
        }
        title='Welcome Admin'
        subheader='Admin'
      />
      {/* Doctor Block */}
      <Container maxWidth='md' sx={{ padding: '2%' }}>
        {/* Title Doctor Block and Standard Grid Sizing */}
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant='body1' color='initial' >
                Doctors
              </Typography>
            </Card>
          </Grid>
        </Grid>
        {/*  Grid Sizing for Doctor Invalid Accounts Paper Tiles */}
        <Grid container spacing={2} >
          {doctorListUnvalidated.map((val,key) => {
            return(
              <Grid item xs={12} sm={6} md={4} lg ={4} key={key}>
                <UrgentPaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label=''>
                        D*
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=''></IconButton>
                    }
                    title = {val.Fname + ' ' + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                   <Typography variant='body2' display='block' gutterBottom sx={{ marginLeft: '20%', color: 'black'}}>Doctor License: {val.License}</Typography>
                  <Button  sx={{ marginLeft: '20%'}} variant='contained' color='primary' onClick={() => validateDoctor(val.ID)} >
                  VALIDATE
                  </Button>
                  <Button variant='contained' color='primary' onClick={() => invalidateDoctor(val.ID)} sx={{ ml: '2%' }} >
                  DENY
                  </Button>
                </UrgentPaper>
              </Grid>
            )
          }
          )}
          {/*  Grid Sizing for DoctorValid Accounts Paper Tiles */}
          {doctorListValidated.map((val,key) => {
            return(
              <Grid item xs={12} sm={6} md={4} lg ={4} key={key}>
                <TilePaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label=''>
                        D{key}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=''></IconButton>
                    }
                    title = {val.Fname + ' ' + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                   <Typography variant='body2' display='block' gutterBottom sx={{ marginLeft: '20%',}}>Doctor License: {val.License}</Typography>
                </TilePaper>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
      {/* Health Officials Block */}
      <Container maxWidth='md' sx={{ padding: '2%' }}>
        {/* Title Health Official Block and Standard Grid Sizing */}
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant='body1' color='initial' >
                Health Officials
              </Typography>
            </Card>
          </Grid>
        </Grid>
        {/*  Grid Sizing for Health Officials Invalid Accounts Paper Tiles */}
        <Grid container spacing={2} >
        {healthOfficialListUnvalidated.map((val,key) => {
            return(
              <Grid item xs={12} sm={6} md={4} lg ={4} key={key}>
                <UrgentPaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label=''>
                        H*
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=''></IconButton>
                    }
                    title = {val.Fname + ' ' + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                   <Button  sx={{ marginLeft: '20%'}} variant='contained' color='primary' onClick={() => validateHO(val.ID)} >
                  VALIDATE
                  </Button>
                  <Button variant='contained' color='primary' onClick={() => invalidateHO(val.ID)} sx={{ ml: '2%' }} >
                  DENY
                  </Button>
                </UrgentPaper>
              </Grid>
            )
          }
          )}
           {/*  Grid Sizing for Health Officials Valid Accounts Paper Tiles */}
          {healthOfficialListValidated.map((val,key) => {
            return(
              <Grid item xs={12} sm={6} md={4} lg ={4} key={key}>
                <TilePaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label=''>
                        H{key}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=''></IconButton>
                    }
                    title = {val.Fname + ' ' + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                </TilePaper>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
      {/* Immigration Officers Block */}
      <Container maxWidth='md' sx={{ padding: '2%' }}>
        {/* Title Immigration Officers Block and Standard Grid Sizing */}
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant='body1' color='initial' >
              Immigration Officers
              </Typography>
            </Card>
          </Grid>
        </Grid>
        {/*  Grid Sizing for Immigration Officers Invalid Accounts Paper Tiles */}
        <Grid container spacing={2} >
        {immigrationOfficerListUnvalidated.map((val,key) => {
            return(
              <Grid item xs={12} sm={6} md={4} lg ={4} key={key}>
                <UrgentPaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label=''>
                        I*
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=''></IconButton>
                    }
                    title = {val.Fname + ' ' + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                  <Button  sx={{ marginLeft: '20%'}} variant='contained' color='primary' onClick={() => validateIO(val.ID)} >
                  VALIDATE
                  </Button>
                  <Button variant='contained' color='primary' onClick={() => invalidateIO(val.ID)} sx={{ ml: '2%' }} >
                  DENY
                  </Button>
                </UrgentPaper>
              </Grid>
            )
          }
          )}
           {/*  Grid Sizing for Immigration Officers Valid Accounts Paper Tiles */}
          {immigrationOfficerListValidated.map((val,key) => {
            return(
              <Grid item xs={12} sm={6} md={4} lg ={4} key={key}>
                <TilePaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label=''>
                        H{key}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=''></IconButton>
                    }
                    title = {val.Fname + ' ' + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                </TilePaper>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
    </Box> </>
  );
}
export default AdminDashboard;
