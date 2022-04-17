import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Box, CssBaseline, Typography, Card, Grid } from '@mui/material'
// import MyPDF from '../SOEN363_Project_Phase2-Winter2022.pdf'; this is where you put file
import {useLocation} from 'react-router-dom';


function DoctorFileDownload() {
  const location = useLocation();
  const [patientId, setPatientId] = useState(location.state.ID);

  return (
    <>
      {/*
        localStorage.getItem('role') != 'Doctor' && <Navigate to={'/'} refresh={true} />
  */}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        {/* Centering the form in the middle of the screen */}
        <Card sx={{ mt: 20, mb: 10 }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4'>Download patient files</Typography>
            <Grid>
              Download files for: {patientId}
              {/* patienId can be replaced by name */}
              {/* <a href={MyPDF} download='My_File.pdf'> Download Here </a> */}
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  );
}
export default DoctorFileDownload;
