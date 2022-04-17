import {Avatar, Box, Grid, CardHeader, Paper, List, ListItem, CardActions, IconButton,} from '@mui/material';
import {styled} from '@mui/material/styles';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Navigate} from 'react-router-dom';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FlagIcon from '@mui/icons-material/Flag';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ClearIcon from '@mui/icons-material/Clear';
import {ArgumentAxis, ValueAxis, Chart, BarSeries} from '@devexpress/dx-react-chart-material-ui';

function DoctorDashboard() {
    
    const [doctorId, setDoctorID] = useState(parseInt(localStorage.getItem('id'))); //Doctor id retrieved from state variable
    const [patientList, setPatientList] = useState([]); //all patient info
    const [patientsPerDoctor, setPatientPerDoctorList] = useState([]); //all patient info
    const [allPatients, setAllPatientList] = useState([]); //all patient info
    const [totalPatientCount, setTotalPatientCount] = useState([]); // total patient count
    const [totalDoctorCount, setValidatedDoctorCount] = useState([]); // total doctor count
    const [totalFlaggedPatientCount, setTotalFlaggedPatientCount] = useState([]); //total flagged patient count
    const [totalStatusCounts, setTotalStatusCounts] = useState([]); // all patient status count
    const [totalMyPatientsStatusCounts, setTotalMyPatientsStatusCounts] = useState([]); //  my patients status count
    const [doctorsWithMostPatientsList, setDoctorsWithMostPatientsList] = useState([]); //list of doctors with most patients
    const [doctorsWithLeastPatientsList, setDoctorsWithLeastPatientsList] = useState([]); //list of doctors with least patients
    const [patientsFlaggedNotViewedList, setPatientsFlaggedNotViewedList] = useState([]); //list of patients whose forms have not been reviewed
    const [patientsFlaggedLeastViewedList, setpatientsFlaggedLeastViewedList] = useState([]); //list of patients whose forms have been viewed from longest to most recent
    const [patientsFlaggedNoSymptomFormResponse, setpatientsFlaggedNoSymptomFormResponseList] = useState([]); //list of patients that have not yet submitted their form
    const [notificationsList, setNotificationsList] = useState([]); //list of notfications
    const [formNotificationsList, setFormNotificationsList] = useState([]);


    // functions to make notifications disappear when clicked on X button
    const handleApptMask = (index) => (event) => {
        // prevent reload, then update notification in backend, then reload page
        event.preventDefault();
        let today = new Date();
        let dateOfAppt = new Date(notificationsList[index].aptDate.concat(' ' + notificationsList[index].endTime))
        let apptTime = new Date(notificationsList[index].endTime)
        // if time is between 1 and 5, we know it should be PM. thus convert to PM time by adding 12 and redefining date of appointment
        if (Number(notificationsList[index].endTime.substr(0,2)) < 8){
            apptTime = (Number(notificationsList[index].endTime.substr(0,2)) + (12))
            dateOfAppt = new Date(notificationsList[index].aptDate.concat(' ' + apptTime + notificationsList[index].endTime.substr(2,6)))
        }
      // if today is after appointment, we mask it, otherwise alert error

        if (today.getTime() > dateOfAppt.getTime()) {
            Axios.put("http://localhost:8080/maskApptNotification", {
                ID: notificationsList[index].ID,
            },{withCredentials: true}).then(() => {
                window.location.reload()
            }).catch((err) => console.log(err));
        } else {
            alert('You can only remove appointment notifications after the appointment date!')
        }
    }

    const handleFormMask = (index) => (event) => {
        // prevent reload, then update notification in backend, then reload page
        event.preventDefault()
        let hours = (Number((formNotificationsList[index].InfoTimestamp.substr(11,2))) - (4))

        if (hours.toString().length< 2){
            hours = '0' + hours
        }
        Axios.put("http://localhost:8080/maskFormNotification", {
            PatientID: formNotificationsList[index].ID,
            InfoTimestamp: formNotificationsList[index].InfoTimestamp.substr(0, 10).concat(' ').concat(hours.toString()).concat((formNotificationsList[index].InfoTimestamp.substr(13,6))),
            FormID: formNotificationsList[index].FormID
        },{withCredentials: true}).then(() => {
            window.location.reload()
        }).catch((err) => console.log(err));
    }

    function getDoctorPatients() { //returns all patient information for a given doctor using GET
        Axios.get("http://localhost:8080/doctorViewingTheirPatientData", {params: {id: doctorId},withCredentials:true}).then((response) => {
            setPatientList(response.data);
        }).catch((err) => console.log(err));
    };

    function getPatientsPerDoctor() { //returns all patient information organized by doctor using GET
        Axios.get("http://localhost:8080/doctorViewingDoctorPatients",{withCredentials: true}).then((response) => {
            setPatientPerDoctorList(response.data);
        }).catch((err) => console.log(err));
    };


    function getAllPatients() { //returns all patient information using GET
        Axios.get("http://localhost:8080/doctorViewingAllPatientData",{withCredentials: true}).then((response) => {
            setAllPatientList(response.data);
        }).catch((err) => console.log(err));
    };

    function getStatusCountAllPatients() {// This will return the number of patients classified under each status for ALL patients
        Axios.get("http://localhost:8080/statusCountAllPatients",{withCredentials: true}).then((response) => {
            setTotalStatusCounts(response.data);
        }).catch((err) => console.log(err));
    };

    function getStatusCountMyPatients() {// This will return the number of patients classified under each status for MY patients
        Axios.get("http://localhost:8080/statusCountMyPatients", {
            params: {
                id: localStorage.getItem('id')
            }, withCredentials:true
        }).then((response) => {
            setTotalMyPatientsStatusCounts(response.data);
        }).catch((err) => console.log(err));
    };

    function getDoctorsWithMostPatients() { //This will return the top 5 doctors with most to least patients
        Axios.get("http://localhost:8080/doctorsWithMostPatients",{withCredentials: true}).then((response) => {
            setDoctorsWithMostPatientsList(response.data);
        }).catch((err) => console.log(err));
    };

    function getDoctorsWithLeastPatients() { //This will return the top 5 doctors with least to most patients
        Axios.get("http://localhost:8080/doctorsWithLeastPatients",{withCredentials: true}).then((response) => {
            setDoctorsWithLeastPatientsList(response.data);
        }).catch((err) => console.log(err));
    };

    function getTotalNumberOfDoctors() { //This will return the total number of validated doctors
        Axios.get("http://localhost:8080/countAllValidatedDoctors",{withCredentials: true}).then((response) => {
            setValidatedDoctorCount(response.data);
        }).catch((err) => console.log(err));
    };

    function getTotalNumberOfPatients() { //This will return the total number of validated doctors
        Axios.get("http://localhost:8080/countAllPatients",{withCredentials: true}).then((response) => {
            setTotalPatientCount(response.data);
        }).catch((err) => console.log(err));
    };

    function getTotalNumberOfFlaggedPatients() { //This will return the total number of validated doctors
        Axios.get("http://localhost:8080/countAllFlaggedPatients",{withCredentials: true}).then((response) => {
            setTotalFlaggedPatientCount(response.data);
        }).catch((err) => console.log(err));
    };

    function getFlaggedPatientsNotViewed() { //This will return the list of patients that have submitted a form but have not been reviewed
        Axios.get("http://localhost:8080/patientsFlaggedNotViewed",{withCredentials: true}).then((response) => {
            setPatientsFlaggedNotViewedList(response.data);
        }).catch((err) => console.log(err));
    };

    function getFlaggedPatientsLeastViewed() { //This will return the list of patients whose form has been reviewed from longest to most recent
        Axios.get("http://localhost:8080/patientsFlaggedLeastViewed",{withCredentials: true}).then((response) => {
            setpatientsFlaggedLeastViewedList(response.data);
        }).catch((err) => console.log(err));
    };

    function getFlaggedPatientsNoSymptomFormResponse() { //This will return the list of patients that have been sent a form to fill out but have not done so
        Axios.get("http://localhost:8080/patientsFlaggedNoSymptomFormResponse",{withCredentials: true}).then((response) => {
            setpatientsFlaggedNoSymptomFormResponseList(response.data);
        }).catch((err) => console.log(err));
    };

    function getAllNotifications() {//This will return patient name, and appointment time
        Axios.get("http://localhost:8080/retrieveAllNotifications", {
            params: {
                id: localStorage.getItem('id')
            }, withCredentials:true
        }).then((response) => {
            setNotificationsList(response.data);
        }).catch((err) => console.log(err));
    }

    function getFormNotifications() {//This will return patient name, and appointment time
        Axios.get("http://localhost:8080/retrieveFormNotifications", {
            params: {
                id: localStorage.getItem('id')
            }, withCredentials:true
        }).then((response) => {
            setFormNotificationsList(response.data);
        }).catch((err) => console.log(err));
    }

    let stopeffect = 1;

    useEffect(() => { //when the doctor dashboard page is rendered, these functions are executed
        getDoctorPatients();
        getPatientsPerDoctor();
        getAllPatients();
        getTotalNumberOfPatients();
        getTotalNumberOfDoctors();
        getTotalNumberOfFlaggedPatients();
        getStatusCountAllPatients();
        getStatusCountMyPatients();
        getDoctorsWithMostPatients();
        getDoctorsWithLeastPatients();
        getFlaggedPatientsNotViewed();
        getFlaggedPatientsLeastViewed();
        getFlaggedPatientsNoSymptomFormResponse();
        getAllNotifications();
        getFormNotifications();
    }, [stopeffect]);


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        overflow: 'auto',
        color: theme.palette.text.secondary,
    }));

    const data = [
        {
            argument: 'Healthy', value: totalStatusCounts.map((val, key) => {
                return (val.healthyCount)
            })
        },
        {
            argument: 'Isolated', value: totalStatusCounts.map((val, key) => {
                return (val.isolatingCount)
            })
        },
        {
            argument: 'Infected', value: totalStatusCounts.map((val, key) => {
                return (val.infectedCount)
            })
        },
    ];

    const myPatientsData = [
        {
            argument: 'Healthy', value: totalMyPatientsStatusCounts.map((val, key) => {
                return (val.healthyCount)
            })
        },
        {
            argument: 'Isolated', value: totalMyPatientsStatusCounts.map((val, key) => {
                return (val.isolatingCount)
            })
        },
        {
            argument: 'Infected', value: totalMyPatientsStatusCounts.map((val, key) => {
                return (val.infectedCount)
            })
        },
    ];

    return (
        <>
            {
                localStorage.getItem("role") != 'Doctor' && <Navigate to={"/"} refresh={true}/>
            }
            <Box sx={{flexGrow: 1}}>   <Grid container spacing={2} sx={{marginBottom: '2%', padding: '2%'}}>
                <Grid item xs={12} md={12} lg ={4}>
                    {/* Displaying the notifications of the logged in doctor */}
                    <Item><h1>Notifications</h1>
                        {notificationsList.map((val, key) => {
                                return (<CardActions style={{ display: "flex", justifyContent: "center"}}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="">
                                                    {key + 1}
                                                </Avatar>
                                            }
                                            //display patient name and appointment time
                                            title={"Patient Name: " + val.Fname + " " + val.Lname}
                                            subheader={"Appointment Time: " + val.aptDate + " " + val.startTime + " to " + val.endTime}
                                        /> <IconButton aria-label="clear" onClick={handleApptMask(key)}>
                                        <ClearIcon/>
                                    </IconButton></CardActions>
                                )
                            } // Displaying notifications specifically form changes
                        )} {formNotificationsList.map((val, key) => {
                                return (<> <CardActions style={{ display: "flex", justifyContent: "center"}}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="">
                                                    {notificationsList.length + key + 1}
                                                </Avatar>
                                            }
                                            // Display patient name and appointment time
                                            title={"Patient Name: " + val.Fname + " " + val.Lname}
                                            // Getting the right info from info time stamp
                                            subheader={"New form updated  " + val.InfoTimestamp.substr(0, 10) + ' at ' + val.InfoTimestamp.substr(11, 8)}
                                        /> {/* On click X button, remove notification */}
                                        <IconButton aria-label="clear" onClick={handleFormMask(key)}>
                                        <ClearIcon/>
                                    </IconButton> </CardActions> </>
                                )
                            }
                        )}
                    </Item> </Grid>


                    <Grid item xs={12} md={6} lg={4}>
                        {/* Using the totalStatusCounts to produce the graoh with corresponding values */}
                        {totalStatusCounts.map((val, key) => {
                            return (
                                <Item key={key}>
                                    <h1>All Patients Registration Statistics</h1>
                                    <Chart data={data}>
                                        <ArgumentAxis/>
                                        <ValueAxis/>
                                        <BarSeries valueField="value" argumentField="argument"/>
                                    </Chart>
                                </Item>
                            )
                        })}

                    </Grid>


                    <Grid item xs={12} md={6} lg={4}>
                        {/* Using the totalMyPatientsStatusCounts to produce the graoh with corresponding values */}
                        {totalMyPatientsStatusCounts.map((val, key) => {
                            return (
                                <Item key={key}>
                                    <h1>My Patients Registration Statistics</h1>
                                    <Chart data={myPatientsData}>
                                        <ArgumentAxis/>
                                        <ValueAxis/>
                                        <BarSeries valueField="value" argumentField="argument"/>
                                    </Chart>
                                </Item>
                            )
                        })}
                    </Grid>



                    <Grid item xs={12} md={6} lg={6}>
                        <List>
                            <Item>
                                <h1>Doctor Registration Statistics</h1>
                                <hr></hr>
                                {/* Displaying the total number of doctors */}
                                {totalDoctorCount.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            <LocalHospitalIcon></LocalHospitalIcon> Total Number of Registered
                                            Doctors: {val.allRegisteredDoctorsCount}
                                        </ListItem>
                                    )
                                })}
                                <hr></hr>
                                {/* Displaying the all the doctors information based on each category*/}
                                <ListItem><MedicationIcon></MedicationIcon>Doctors with Most Assigned
                                    Patients:</ListItem>
                                {doctorsWithMostPatientsList.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            {val.Fname} {val.LName} | <EmailIcon
                                            fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon
                                            fontSize='small'></LocalPhoneIcon> {val.Phone}
                                        </ListItem>
                                    )
                                })}
                                <hr></hr>
                                <ListItem><MedicationIcon></MedicationIcon>Doctors with Least Assigned
                                    Patients:</ListItem>
                                {doctorsWithLeastPatientsList.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            {val.Fname} {val.LName} | <EmailIcon
                                            fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon
                                            fontSize='small'></LocalPhoneIcon> {val.Phone}
                                        </ListItem>
                                    )
                                })}
                                <hr></hr>
                            </Item>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <List>
                            <Item>
                                <h1>Patients Active Assistance Required</h1>
                                <hr></hr>
                                {/* Displaying the total number of patients */}
                                {totalPatientCount.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            <AccessibilityIcon></AccessibilityIcon>Total Number of Registered
                                            Patients: {val.allPatientCount}
                                        </ListItem>
                                    )
                                })}
                                {/* Displaying the all the patients information based on each category*/}
                                {totalFlaggedPatientCount.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            <FlagIcon></FlagIcon>Total Number of Flagged
                                            Patients: {val.allFlaggedPatientCount}
                                        </ListItem>
                                    )
                                })}
                                <hr></hr>
                                <ListItem><AccessibilityIcon></AccessibilityIcon>Patients Flagged and Not
                                    Viewed:</ListItem>
                                {patientsFlaggedNotViewedList.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            {val.Fname} {val.Lname} | <EmailIcon
                                            fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon
                                            fontSize='small'></LocalPhoneIcon> {val.Phone}
                                        </ListItem>
                                    )
                                })}
                                <hr></hr>
                                <ListItem><AccessibilityIcon></AccessibilityIcon>Patients Least Recently
                                    Viewed:</ListItem>
                                {patientsFlaggedLeastViewedList.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            {val.Fname} {val.Lname} | <EmailIcon
                                            fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon
                                            fontSize='small'></LocalPhoneIcon> {val.Phone}
                                        </ListItem>
                                    )
                                })}
                                <hr></hr>
                                <ListItem><AccessibilityIcon></AccessibilityIcon>Patients Flagged and Require Form
                                    Response Immediately:</ListItem>
                                {patientsFlaggedNoSymptomFormResponse.map((val, key) => {
                                    return (
                                        <ListItem key={key}>
                                            {val.Fname} {val.Lname} | <EmailIcon
                                            fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon
                                            fontSize='small'></LocalPhoneIcon> {val.Phone}
                                        </ListItem>
                                    )
                                })}
                                <hr></hr>
                            </Item>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default DoctorDashboard;