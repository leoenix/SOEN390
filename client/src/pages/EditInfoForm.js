import { Paper, FormControl, FormLabel, TextField, Button, Typography} from '@mui/material';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

//This variable represents a function that will be called when the
//user submits the form with their updated data. The updated data will be 
//sent to the Server.js file so that the user's data can be altered in
//the database.
let submitEditInfoForm = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  Axios.post('http://localhost:8080/editedPatientData', {
    patientid: localStorage.getItem('id'),
    fname: data.get('firstName'),
    lname: data.get('lastName'),
    email: data.get('patientEmail'),
    phone: data.get('patientPhone'),
    healthinsurance: data.get('patientHI'),
  },{withCredentials: true}).then(() => {
    console.log('success');
    window.location.href = '/PatientProfile';
  });
};

function EditInfoForm() {
  //These variables are used to get the current patient's data.
  //The const allows us to store the data in a variable using useState()
  //and the stopeffect will make sure that our useEffect() will only
  //run one time.
  const [editPatientData, setEditPatientData] = useState([]);
  let stopeffect = 1;

  //This useEffect() will run after the page renders. It will
  //get the patients data by using a get and going to the 
  //Server.js file to execute the code to query for the current data.
  useEffect(() => {
    Axios.get('http://localhost:8080/editPatientProfileData', {
      withCredentials: true,
      params: { id: localStorage.getItem('id') }
    },{withCredentials: true}).then((response) => {
      setEditPatientData(response.data);
      console.log(response);
    });
  }, [stopeffect]);

  let patientFName = editPatientData.map((val, key) => {
    return val.FName;
  });
  let patientLName = editPatientData.map((val, key) => {
    return val.LName;
  });
  let patientHealthInsurance = editPatientData.map((val, key) => {
    return val.HealthInsurance;
  });
  let patientPhoneNumber = editPatientData.map((val, key) => {
    return val.Phone;
  });
  let patientEmail = editPatientData.map((val, key) => {
    return val.Email;
  });

  // Allows patients to edit their information adding appropriate info in the text fields
  // defaultValue is set using previous values however 'key' is needed to perform an operation to render the value each time
  return (
    <>
      {localStorage.getItem('role') !== 'Patient' && (
        <Navigate to={'/'} refresh={true} />
      )}
      <div align='Center'>
        <Paper
          elevation={15}
          component='form'
          onLoad
          onSubmit={submitEditInfoForm}
          sx={{ width: 700, height: 1000, mt: 10 }}
        >
          <Typography component='h1' variant='h2' sx={{ mt: 5, mb: 5 }}>
            Edit Profile Information
          </Typography>
          {/* Asks the user for all their input in order to update the server */}
          <FormControl>
            <FormLabel id='firstName' sx={{ mb: 3 }}>
              Please enter your first name
            </FormLabel>
            <TextField
              id='firstName'
              name='firstName'
              key={Math.random() * 1000}
              defaultValue={patientFName}
              required
              label='First Name'
              variant='filled'
              type='text'
              inputProps={{ maxLength: 15 }}
              sx={{ mb: 5 }}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <FormLabel id='lastName' sx={{ mb: 3 }}>
              Please enter your last name
            </FormLabel>
            <TextField
              id='lastName'
              name='lastName'
              key={Math.random() * 1000}
              defaultValue={patientLName}
              required
              label='Last Name'
              variant='filled'
              type='text'
              inputProps={{ maxLength: 15 }}
              sx={{ mb: 5 }}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <FormLabel id='patientHI' sx={{ mb: 3 }}>
              Health Insurance Number
            </FormLabel>
            <TextField
              id='patientHI'
              name='patientHI'
              key={Math.random() * 1000}
              defaultValue={patientHealthInsurance}
              required
              label='Health Insurance'
              variant='filled'
              type='text'
              inputProps={{ maxLength: 10 }}
              sx={{ mb: 5 }}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <FormLabel id='patientPhone' sx={{ mb: 3 }}>
              Please enter your phone number
            </FormLabel>
            <TextField
              id='patientPhone'
              name='patientPhone'
              key={Math.random() * 1000}
              defaultValue={patientPhoneNumber}
              required
              label='Phone number'
              variant='filled'
              type='number'
              inputProps={{ maxLength: 9 }}
              sx={{ mb: 5 }}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <FormLabel id='patientEmail' sx={{ mb: 3 }}>
              Please enter your email address
            </FormLabel>
            <TextField
              id='patientEmail'
              name='patientEmail'
              key={Math.random() * 1000}
              defaultValue={patientEmail}
              required
              label='Email address'
              variant='filled'
              type='text'
              inputProps={{ maxLength: 240 }}
              sx={{ mb: 5 }}
            />
          </FormControl>
          <br></br>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default EditInfoForm;
