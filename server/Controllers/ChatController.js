const express = require("express");
const db = require("../database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const ChatController = express.Router()

ChatController.use(express.json());
ChatController.use(cookieParser());
ChatController.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
ChatController.use(express.static(path.join(__dirname, "../client/build")));
ChatController.use(express.static(__dirname + "../client/public/"));
ChatController.use(bodyParser.urlencoded({ extended: true }));
ChatController.use(bodyParser.json())
ChatController.use(express.static('dist'));


ChatController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Sets ChatRequested attribute in the patient table to 1
ChatController.post("/RequestChat", (req, res) => {
    let patientID = req.body.patientid; //this PatientID is used in the query to specify which patient tuple to edit
    //parameters: ID
    //returns:
    state = "UPDATE 390db.patients SET ChatRequested=1 WHERE ID=?"
    db.query(state,
        [patientID],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Chat Requested!");
            }
        }
    );
});

//Sets the ChatPermission attribute in the patient table to 1 and ChatRequested attribute to 0
ChatController.post("/acceptChat", (req, res) => {
    let patientID = req.body.PatientID; //this PatientID is used in the query to specify which patient tuple to edit
    //parameters: ID
    //returns:
    state = "UPDATE 390db.patients SET ChatRequested=false WHERE ID=?"
    db.query(state, [patientID],
        (err, results) => {
            if (err) {
                console.log(err);
            }
        }
    );
    state2 = "UPDATE 390db.patients SET ChatPermission=true WHERE ID=?"
    //parameters: ID
    //returns:
    db.query(state2, [patientID],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                //console.log("Chat accepted");
                res.send("Chat Accepted!");
            }
        }
    );
});

//This query get all messages between a specific patient and doctor.
//parameters: patientId
//returns: `MessageID`, `PatientID`, `DoctorID`, `RoomID`, `Timestamp`, `Message`, `SenderID`, `Seen`
ChatController.get("/liveChatMessages", (req, res) => {
    let patientId = req.query["id"];

    let state1 = "SELECT * FROM 390db.livechat LC WHERE LC.PatientID = ? ORDER BY LC.Timestamp";
    db.query(state1,
        [patientId],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        }
    );
});

/*This post method adds new patient live chat messages to the database*/
//parameters: patientId, doctorId, roomId, timestamp, message, senderId
//returns:
ChatController.post("/createPatientLiveChatMessage", (req, res) => {
    let patientId = req.body.id;
    let doctorId;
    let roomId = req.body.id;
    let timestamp = new Date();
    let message = req.body.message;
    let senderId = req.body.id;

    //Finds the patient's doctor's id
    //Parameters: patientId
    //returns: DoctorID
    let state1 = "SELECT P.DoctorID FROM 390db.Patients P WHERE P.ID = ?";
    db.query(state1,
        [patientId],
        (err, results) => {
            if (err) {
                console.log(err);
                return;
            } else {// If we are able to find a doctor ID, then we begin inserting the message into the database
                doctorId = results[0]["DoctorID"];

                //This query inserts a new message between a patient and doctor into the livechat table
                //parameters: patientId, doctorId, senderId, timestamp
                //returns:
                let state2 = "INSERT INTO 390db.livechat (PatientID, DoctorID, RoomID, Timestamp, Message, SenderID, Seen) VALUES (?,?,?,?,?,?,0)";
                db.query(state2, [patientId, doctorId, roomId, timestamp, message, senderId],
                    (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log("Message inserted!");
                        }
                    }
                );
            }
        }
    );
});

/*This post method is called when a patient or doctor sends a message through the live chat*/
//parameters: patientId, doctorId, roomId,senderId, timestamp, message, senderId
//returns: 
ChatController.post("/createDoctorLiveChatMessage", (req, res) => {
    let patientId = req.body.patientId;
    let doctorId = req.body.id;
    let roomId = req.body.patientId;
    let timestamp = new Date();
    let message = req.body.message;
    let senderId = req.body.id;


    //This query inserts a new message between a patient and doctor into the livechat table
    //parameters: PatientID, DoctorID, SenderID, Timestamp
    //returns:
    let state2 = "INSERT INTO 390db.livechat (PatientID, DoctorID, RoomID, Timestamp, Message, SenderID, Seen) VALUES (?,?,?,?,?,?,0)";
    db.query(state2, [patientId, doctorId, roomId, timestamp, message, senderId],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                //console.log("Message inserted!");
            }
        }
    );
});

//This query gets the patient name, doctor name, and doctor id for a specific patient id
//parameters: patientId
//returns: patientName, doctorName, doctorId
ChatController.get("/patientDoctorName", (req, res) => {
    let patientId = req.query.id;
    //This query is used in order to get the first name of both the patient and doctor using the patiendid as the passed value
    let state = "SELECT pat.FName AS patientName, doc.FName AS doctorName, doc.ID AS doctorId FROM 390db.patients p, 390db.users pat, 390db.users doc WHERE p.ID = ? AND p.ID = pat.ID AND p.DoctorID = doc.ID";
    db.query(state, [patientId],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        }
    );
});

module.exports = ChatController;