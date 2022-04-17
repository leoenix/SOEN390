const express = require("express");
const db = require("../Database");
const mail = require("nodemailer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const {admin} = require("../middleware/Roles");
const {auth} = require("../middleware/Auth");

const AdminController = express.Router()

AdminController.use(express.json());
AdminController.use(cookieParser());
AdminController.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
AdminController.use(express.static(path.join(__dirname, "../client/build")));
AdminController.use(express.static(__dirname + "../client/public/"));
AdminController.use(bodyParser.urlencoded({ extended: true }));
AdminController.use(bodyParser.json());
AdminController.use(express.static('dist'));

AdminController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let sendEmail = (fName, lName, email) => {
    const transporter = mail.createTransport({
        service: "gmail",
        auth: {
            user: "noreply.COVID19site@gmail.com",
            pass: "COVID19#2022"
        }
    });

    const mailOptions = {
        from: "COVID 19 WEBSITE",
        to: email,
        subject: "Your Account Has Been Invalidated",
        text: "Dear " + fName + " " + lName + ",\n\n" + "We regret to inform you that your account has been invalidated.\n\nRegards,\n\nCOVID 19 Website"
    };

    transporter.sendMail(mailOptions);
};

// Gets validated doctor first name, last name, phone number to the admin
AdminController.get("/adminViewingValidatedDoctorData", [admin, auth],(req, res) => {

    let state = 'SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Phone, Udoctor.Validated, Udoctor.ID, D.License FROM 390db.users Udoctor, 390db.doctors D WHERE Udoctor.ID = D.ID AND Udoctor.Validated = 1;';
    //parameters:
    //returns: (doctor first name, doctor last name, doctor phone, validity state of doctor, doctor ID, doctor license)
    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Gets unvalidated doctor first name, last name, phone number to the admin
AdminController.get("/adminViewingUnvalidatedDoctorData", [admin, auth], (req, res) => {
    let state = 'SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Phone, Udoctor.Validated, Udoctor.ID, D.License FROM 390db.users Udoctor, 390db.doctors D WHERE Udoctor.ID = D.ID AND Udoctor.Validated = 0;';
    //parameters:
    //returns: (doctor first name, doctor last name, doctor phone, validity state of doctor, doctor ID, doctor license)
    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            res.send(result);
        }
    });
}
);

// Gets validated health official first name, last name, phone number, ID, and validation status to the admin
AdminController.get("/adminViewingValidatedHealthOfficalData", [admin, auth], (req, res) => {
    let state = 'SELECT Uho.Fname, Uho.Lname, Uho.Phone, Uho.Validated, Uho.ID FROM 390db.users Uho WHERE Uho.Role = "Health Official" AND Uho.Validated = 1;';
    //parameters:
    //returns: (health official first name, health official last name, health official phone, validity state of health official, health official ID)

    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            res.send(result);
        }
    });
}
);

// Gets unvalidated health official first name, last name, phone number, ID, and validation status to the admin
AdminController.get("/adminViewingUnvalidatedHealthOfficalData", [admin, auth],(req, res) => {
    let state = 'SELECT Uho.Fname, Uho.Lname, Uho.Phone, Uho.Validated, Uho.ID FROM 390db.users Uho WHERE Uho.Role = "Health Official" AND Uho.Validated = 0;';
    //parameters:
    //returns: (health official first name, health official last name, health official phone, validity state of health official, health official ID)
    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            res.send(result);
        }
    });
}
);

// Gets validated immigration officer first name, last name, phone number, ID, and validation status to the admin
AdminController.get("/adminViewingValidatedImmigrationOfficerData", [admin, auth],(req, res) => {
    let state = 'SELECT Uio.Fname, Uio.Lname, Uio.Phone, Uio.Validated, Uio.ID FROM 390db.users Uio WHERE Uio.Role = "Immigration Officer" AND Uio.Validated = 1;';
    //parameters:
    //returns: (immigration officer first name, immigration officer last name, immigration officer phone, validity state of immigration officer, immigration officer ID)
    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            res.send(result);
        }
    });

}
);

// Gets unvalidated immigration officer first name, last name, phone number, ID, and validation status to the admin
AdminController.get("/adminViewingUnvalidatedImmigrationOfficerData", [admin, auth], (req, res) => {
    let state = 'SELECT Uio.Fname, Uio.Lname, Uio.Phone, Uio.Validated, Uio.ID FROM 390db.users Uio WHERE Uio.Role = "Immigration Officer" AND Uio.Validated = 0;';
    //parameters:
    //returns: (immigration officer first name, immigration officer last name, immigration officer phone, validity state of immigration officer, immigration officer ID)
    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            res.send(result);
        }
    });
}
);

// Gets patient first name, last name, phone number to the admin
AdminController.get("/adminViewingPatientData", [admin, auth], (req, res) => {
    //parameters:
    //returns: (patient first name, patient last name, patient phone, doctor first name, doctor last name)
    let state = 'SELECT Upatient.ID, Upatient.Fname, Upatient.Lname, Upatient.Phone, Udoctor.Fname AS docFname, Udoctor.Lname AS docLname FROM 390db.users Upatient, 390db.patients P, 390db.users Udoctor WHERE Upatient.ID = P.ID AND P.DoctorID = Udoctor.ID;';
    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Post to validate doctor in database
AdminController.post("/validateDoctor", [admin, auth],(req, res) => {
    let DoctorID = req.body.DoctorID;
    let state = 'UPDATE 390db.users SET Validated = 1 WHERE ID = ?';
    //parameters: DoctorID
    //returns:
    db.query(state, [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Doctor validated!");
        }
    });
});


AdminController.post("/invalidateDoctor", [admin, auth],(req, res) => {
    //Delete from the database
    let DoctorID = req.body.DoctorID;
    var fName;
    var lName;
    var email;
    //parameters: DoctorID
    //returns:
    let state = "SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Email FROM 390db.users Udoctor, 390db.doctors D WHERE Udoctor.ID = D.ID AND D.ID = ?";
    db.query(state, [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            fName = result[0].Fname;
            lName = result[0].Lname;
            email = result[0].Email;
        }
    });
    //parameters: DoctorID
    //returns:
    let state2 = "DELETE FROM 390db.doctors WHERE ID = ?";
    db.query(state2, [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Doctors table"); //This will eventually send an email to the invalidated doctor
        }
    });
    //parameters: DoctorID
    //returns:
    let state3 = "DELETE FROM 390db.users WHERE ID = ?";
    db.query(state3, [DoctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Users Table");
            sendEmail(fName, lName, email); //This sends an email to the invalidated doctor
        }
    });
});


AdminController.post("/validateHealthOfficial", [admin, auth],(req, res) => {
    //Validates a Health Official account request
    let HealthOfficialID = req.body.HealthOfficialID;
    let state = 'UPDATE 390db.users SET Validated = 1 WHERE ID = ?';
    //parameters: HealthOfficialID
    //returns:
    db.query(state, [HealthOfficialID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Health Official validated!");
        }
    });
});

AdminController.get("/mostToLeastPatients", [auth, admin], (req, res) => {
    //Returns all the doctors ordered from least to most patients
    let state = "SELECT  U.ID, U.Fname, U.Lname, U.Email, U.Phone, U.Address, d.patientCount FROM 390db.doctors D, 390db.users U WHERE D.ID = U.ID AND U.validated = '1' GROUP BY D.ID ORDER BY patientCount ASC";
    //parameters:
    //returns: returns a list of doctors from least to most patients while providing the doctors names, email, phone, address, and patient count.
    db.query(state, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

AdminController.post("/invalidateHealthOfficial", [admin, auth],(req, res) => {
    //Deletes the Health Official that requested an account from the database.
    let HealthOfficialID = req.body.HealthOfficialID;
    console.log(HealthOfficialID);
    var fName;
    var lName;
    var email;
    //parameters: HealthOfficialID
    //returns:
    let state = "SELECT Uho.Fname, Uho.Lname, Uho.Email FROM 390db.users Uho WHERE Uho.ID = ?";
    db.query(state, [HealthOfficialID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            fName = result[0].Fname;
            lName = result[0].Lname;
            email = result[0].Email;
            console.log(email);
        }
    });
    //parameters: HealthOfficialID
    //returns:
    let state2 = "DELETE FROM 390db.otherusers WHERE ID = ?"
    db.query(state2, [HealthOfficialID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Other Users table"); //This will eventually send an email to the invalidated health official
        }
    });
    //parameters: HealthOfficialID
    //returns:
    let state3 = "DELETE FROM 390db.users WHERE ID = ?";
    db.query(state3, [HealthOfficialID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Users Table");
            sendEmail(fName, lName, email); //This sends an email to the invalidated health official
        }
    });
});

AdminController.post("/validateImmigrationOfficer", [auth, admin], (req, res) => {
    //Validates the account of an Immigration Officer
    let ImmigrationOfficerID = req.body.ImmigrationOfficerID;
    let state = 'UPDATE 390db.users SET Validated = 1 WHERE ID = ?';
    //parameters: ImmigrationOfficerID
    //returns:
    db.query(state, [ImmigrationOfficerID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Immigration Officer validated!");
        }
    });
});

AdminController.post("/invalidateImmigrationOfficer", [admin, auth], (req, res) => {
    //Delete the Immigration Officer that requested an account from the database.
    let ImmigrationOfficerID = req.body.ImmigrationOfficerID;
    console.log(ImmigrationOfficerID);
    var fName;
    var lName;
    var email;
    //parameters: ImmigrationOfficerID
    //returns:
    let state = "SELECT Uio.Fname, Uio.Lname, Uio.Email FROM 390db.users Uio WHERE Uio.ID = ?";
    db.query(state, [ImmigrationOfficerID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            fName = result[0].Fname;
            lName = result[0].Lname;
            email = result[0].Email;
            console.log(email);
        }
    });
    //parameters: ImmigrationOfficerID
    //returns:
    let state2 = "DELETE FROM 390db.otherusers WHERE ID = ?";
    db.query(state2, [ImmigrationOfficerID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Other Users table"); //This will eventually send an email to the invalidated immigration officer
        }
    });
    //parameters: ImmigrationOfficerID
    //returns:
    let state3 = "DELETE FROM 390db.users WHERE ID = ?";
    db.query(state3, [ImmigrationOfficerID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted from Users Table");
            sendEmail(fName, lName, email); //This sends an email to the invalidated immigration officer
        }
    });
});

AdminController.post("/reassignPatient", [admin, auth],(req, res) => {
    //Reasigns a patient to a new doctor in the database
    //Resets chat permission/request values
    //Deletes all old messages.
    //Also changes the patientCount for the doctors involved in the reassigning

    let newDocID = req.body.DoctorID;
    let patientID = req.body.PatientID;

    //parameters: patientID
    //returns: oldDocID
    let state1 = "SELECT DoctorID FROM 390db.patients WHERE ID =?";
    let statedoc = "UPDATE 390db.doctors SET patientCount = ? WHERE ID = ?";
    db.query(state1, [patientID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            var oldDocID = result[0].DoctorID;

            //parameters: oldDocID
            //returns: patientCount
            let state1_2 = "SELECT patientCount FROM 390db.doctors WHERE ID=?";
            db.query(state1_2, [oldDocID], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let countMinus = result[0].patientCount - 1;

                    //parameters: countMinus, OldDocID
                    //returns:
                    db.query(statedoc, [countMinus, oldDocID], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
    });

    //parameters: newDocID, patientID
    //returns:
    let state2 = "UPDATE 390db.patients SET DoctorID = ? WHERE ID = ?";
    db.query(state2, [newDocID, patientID], (err, result) => {
        if (err) {
            console.log(err);
        }
    });

    //paremeters: patientID
    //returns:
    let state3 = "UPDATE 390db.patients SET ChatRequested=0, ChatPermission=0 WHERE ID = ?";
    db.query(state3, [patientID], (err, result) => {
        if (err) {
            console.log(err);
        }
    });

    //parameters: patientID
    //returns: 
    let state4 = "DELETE FROM 390db.livechat WHERE PatientID = ?";
    db.query(state4, [patientID], (err, result) => {
        if (err) {
            console.log(err);
        }
    });

    //parameters: newDocID
    //returns: patientCount
    let state5 = "SELECT patientCount FROM 390db.doctors WHERE ID=?";
    db.query(state5, [newDocID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            let countPlus = result[0].patientCount + 1;

            //paremeters: countPlus, newDocID
            //returs: 
            db.query(statedoc, [countPlus, newDocID], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Patient Reassigned");
                }
            });
        }
    });
});

module.exports = AdminController;