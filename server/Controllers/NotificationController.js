const express = require("express");
const db = require("../Database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const mail = require("nodemailer");
const NotificationController = express.Router();
const {doctor} = require("../middleware/Roles");
const {auth} = require("../middleware/Auth");

NotificationController.use(express.json());
NotificationController.use(cookieParser());
NotificationController.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
NotificationController.use(express.static(path.join(__dirname, "../client/build")));
NotificationController.use(express.static(__dirname + "../client/public/"));
NotificationController.use(bodyParser.urlencoded({ extended: true }));
NotificationController.use(bodyParser.json());
NotificationController.use(express.static('dist'));

NotificationController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Gets patient name, and appointment time

NotificationController.get("/retrieveAllNotifications", [auth, doctor], (req, res) => {
    let doctorID = req.query["id"];
    //parameters: DoctorID
    //returns: FName, LName, aptDate, StartTime,EndTime
    let state = "SELECT Upatient.Fname, Upatient.Lname, A.aptDate, A.startTime, A.endTime, A.ID " +
        "FROM 390db.appointments A, 390db.users Upatient, 390db.doctors D, 390db.patients P " +
        "Where A.Notification = 1 AND A.PatientID = Upatient.ID AND A.doctorID = ? AND P.id=Upatient.id AND P.doctorID = D.id;";
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

NotificationController.get("/retrieveFormNotifications", [auth, doctor],(req, res) => {
    let doctorID = req.query["id"];
    //parameters: DoctorID
    //returns: FName, LName, aptDate, StartTime,EndTime
    let state = "SELECT Upatient.Fname, Upatient.Lname, Upatient.ID, Hi.InfoTimestamp, Hi.FormID " +
        "FROM 390db.healthinformation Hi, 390db.users Upatient, 390db.doctors D, 390db.patients P " +
        "Where Hi.PatientID = Upatient.ID AND D.ID = ? AND P.id=Upatient.id AND P.doctorID = D.id AND Hi.Notification = 1;";
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Gets the total number of appointments
NotificationController.post("/getAllNotificationCount", [auth,doctor],(req, res) => {
    let doctorID = req.query["id"];
    //parameters: DoctorID
    //returns: (count of rows)
    let state = "SELECT count(*) as notificationCount FROM 390db.appointments A WHERE A.DoctorID = ?";
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

NotificationController.put("/maskFormNotification", [auth, doctor],(req, res) => {

    let PatientID = req.body.PatientID;
    let InfoTimestamp = req.body.InfoTimestamp;
    let FormID = req.body.FormID;
    console.log(InfoTimestamp);
    // parameters: timestamp of form, patient ID
    // updates: notification value to 0
    let state = "UPDATE 390db.healthinformation Hi SET Hi.Notification = 0 WHERE FormID = ? AND PatientID = ?";
    db.query(state, [FormID, PatientID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

NotificationController.put("/maskApptNotification", [auth,doctor],(req, res) => {

    let ApptID = req.body.ID;
    // parameters: ID of appointment
    // updates: notification value to 0
    let state = "UPDATE 390db.appointments A SET A.Notification = 0 WHERE ID = ?";
    db.query(state, [ApptID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

//reruns the check every 60 seconds for the target time of 23:30
let checkTime = setInterval(() => {
    let dateNow = new Date();
    let timeNow = dateNow.getHours() + ":" + dateNow.getMinutes();
    let dayNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate()
    console.log(dayNow + "\t" + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds());

    reminderNotification(timeNow, dateNow, dayNow);
}, 60000);

function reminderNotification(timeNow, dateNow, dayNow) {
    if (timeNow == "23:30") {
        //parameters: 
        //reutrns: users names and emails 
        let state = "select U.FName, U.LName, U.email, U.id from users U where U.ID not in (select U.ID from users U, healthInformation HI where U.ID = HI.PatientID and HI.InfoTimestamp =?) and U.Role = 'Patient';";
        db.query(state, [dayNow],
            (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    //send email to all emails from results
                    for (i = 0; i < results.length; i++) {
                        let fName = results[i]['FName'];
                        let lName = results[i]['LName'];
                        let email = results[i]['email'];
                        const transporter = mail.createTransport({
                            service: "gmail",
                            auth: {
                                user: "noreply.COVID19site@gmail.com",
                                pass: "COVID19#2022"
                            }
                        });

                        const mailOptions = {
                            from: "COVID 19 WEBSITE",
                            to: email,//i,
                            subject: "A status update is needed",
                            text: "Dear " + fName + " " + lName + ",\n\n" + "We would like to remind you to update your profile with your symptoms for today (" + dayNow + ')' + "\n\nRegards,\n\nCOVID 19 Website"
                        }
                        transporter.sendMail(mailOptions)
                    }

                }
            }
        );
    }
}

module.exports = NotificationController;