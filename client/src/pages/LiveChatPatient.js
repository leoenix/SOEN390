import { Container, Box, Grid, CssBaseline, Button, Chip, Paper, Typography, Divider, List, ListItem, ListItemText, FormControl, TextField, IconButton } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send'
import { Navigate } from "react-router-dom";
import Axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8080");

function LiveChat() {

    //declaring the variables
    let stopEffect = 1;
    const ENTERCODE = 13;
    const scrollBottomRef = useRef(null);

    //declaring all the use states
    const [patient, setPatient] = useState(""); //the name
    const [doctor, setDoctor] = useState(""); //the name 
    const [doctorId, setDoctorId] = useState(""); //the id 
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    //scrolls to the bottom of the messages
    useEffect(() => {
        if (scrollBottomRef.current) {
            scrollBottomRef.current.scrollIntoView({ behavior: 'auto' });
        }
    })

    //gets the name of doctor and patient
    useEffect(() => {
        Axios.get('http://localhost:8080/patientDoctorName', {
            withCredentials: true,
            params: { id: localStorage.getItem('id') }
        }).then((response) => {
            setPatient(response.data[0].patientName);
            setDoctor(response.data[0].doctorName);
            setDoctorId(response.data[0].doctorId);
        })
    }, [stopEffect]);

    //Gets the messages to display
    useEffect(() => {
        Axios.get('http://localhost:8080/liveChatMessages', {
            withCredentials: true,
            params: { id: localStorage.getItem('id') }
        }).then((response) => {
            setAllMessages(response.data);
        })
    }, [stopEffect]);

    //joind the room based on patient id on render
    useEffect(() => {
        if (localStorage.getItem("id") !== "") {
            socket.emit("join_room", localStorage.getItem('id'));
        }
    }, [stopEffect]);

    //This useEffect is for receiving messages from the server. NOTE: Only people in the room that is sending messages will receive them (implemented in the backend).
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setAllMessages(allMessages => [...allMessages, { Message: data.message, SenderID: doctorId, patientId: parseInt(localStorage.getItem('id')), DoctorID: doctorId }]);
            // window.location.reload(false);
        })
    }, [socket]);

    //stores message in database
    const sendMessage = async () => {

        if (message === '') {
            return;
        }
        //Message sent by the patient is inserted into the database
        Axios.post("http://localhost:8080/createPatientLiveChatMessage", {
            id: localStorage.getItem('id'), //Pass the patient's id and message to the backend
            message: message
        }, {withCredentials:true});
         //create a message and send it to doctor
        const messageData = {
            roomId: localStorage.getItem('id'),
            patientId: localStorage.getItem('id'),
            message: message
        }
        await socket.emit("send_message", messageData);
        setAllMessages(allMessages => [...allMessages, { Message: message, SenderID: parseInt(localStorage.getItem('id')), Patientid: parseInt(localStorage.getItem('id')), DoctorID: doctorId }]);
        setMessage('');
        // window.location.reload(false);

    }

    //allows us to write message in text box
    const handleMessgaeChange = (event) => {
        setMessage(event.target.value);
    }

    //allows for us to press enter key and send message
    const handleEnterKey = (event) => {
        if (event.keyCode === ENTERCODE) {
            sendMessage();
        }
    }

    //gives an alert with all the text when a message is pressed
    const showMessage = (event) => {
        alert(event.target.innerText);
    };

    let listChatMessages = [];
    //put all the messages from server in proper format
    allMessages.forEach((item, index) => {
        listChatMessages.push(
            <ListItem key={index} justify="flex-end">
                {(item.SenderID == parseInt(localStorage.getItem('id'))) ?
                    //messages sent by patient will display on the right
                    (<ListItemText />) : (<span></span>)}
                {(item.SenderID == parseInt(localStorage.getItem('id'))) ?
                    //shows the actaul text bubble with appropriate message
                    (<Chip sx={{ maxWidth: 1 / 1, height: 'auto' + 4 }} label={`${item.Message}`} color="primary" onClick={showMessage} />) :
                    (<Chip sx={{ maxWidth: 1 / 1, height: 'auto' + 4 }} variant="outlined" label={`${item.Message}`} onClick={showMessage} color="primary" />)}
            </ListItem>
        );
    })

    return (
        <>
            {
                localStorage.getItem("role") != 'Patient' && <Navigate to={"/"} refresh={true} />
            }
            <div>
                <Container>
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Typography variant='h6' gutterBottom>
                                Live Chat with: {doctor}
                            </Typography>
                            <Divider />
                            <Grid container spacing={4} alignItems="center">
                                <Grid sx={{ height: '20rem' }} xs={12} item>
                                    <List id="chat-messages" sx={{ height: '18rem', overflow: 'auto' }}>
                                        {listChatMessages}
                                        <ListItem ref={scrollBottomRef}></ListItem>
                                    </List>
                                </Grid>
                                <Grid xs={2} item>
                                    <Typography variant='subtitle1'>
                                        {patient}
                                    </Typography>
                                </Grid>
                                <Grid xs={9} item>
                                    <FormControl fullWidth>
                                        <TextField onChange={handleMessgaeChange} onKeyDown={handleEnterKey} label="Type your message" variant='outlined' value={message} />
                                    </FormControl>
                                </Grid>
                                <Grid xs={1} item>
                                    <IconButton aria-label="send" color="primary" onClick={sendMessage}>
                                        <SendIcon />
                                    </IconButton>
                                </Grid>

                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </div>
        </>
    )
}
export default LiveChat;