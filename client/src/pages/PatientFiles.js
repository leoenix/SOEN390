import { Paper, FormControlLabel, FormControl, Typography, Radio, RadioGroup, Button } from '@mui/material';
import React from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';

//This variable represents a function that will be called when the user submits
//their form to change their status. It will post the data from the form to
//the Server.js file so that the patient's information can be altered in
//the database.
let submitPatientFile = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  Axios.post('http://localhost:8080/createPatientFile', {
    patientid: localStorage.getItem('id'),
    status: data.get('PatientFile')
  },{withCredentials: true}).then(() => {
    console.log('success');
    window.location.href = "/PatientFiles";
  });
};

function PatientFiles() {

  return (
    <>
      {/* Make sure the user signed in is a patient */}
      {
        localStorage.getItem("role") != 'Patient' && <Navigate to={"/"} refresh={true} />
      }

      <div align="Center">
        <Paper elevation={24} component="form" onSubmit={submitPatientFile} sx={{ width: 600, height: 500, mt: 10 }}>
          <Typography component="h1" variant="h2" sx={{ mt: 3, mb: 10 }}>
            Upload Lab Files
          </Typography>
          <Typography component="p" variant="p" sx={{ mt: 1, mb: 1 }}>
            Please Select Lab Files To Upload So Medical Professionals Can View Them.
            <br></br>
            File Format Accepted is PDF or Images.
          </Typography>
          {/* The form with the radio buttons to select your status */}
          <FormControl>
            <Button xs={12} sm={3} sx={{ margin: 1 }} variant="contained" component="label" >
              <input accept=".pdf,image/*" type="file" />
            </Button>
          </FormControl>
          <br></br>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Paper>
      </div>
    </>
  );
}
export default PatientFiles;