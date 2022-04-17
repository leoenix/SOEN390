import "core-js";
const request = require('supertest');
const sinon = require('sinon');
const { changeUser } = require('../../../server/database.js');
// const auth = require('../../../server/middleware/auth')
// const roles = require('../../../server/middleware/roles');
// jest.mock('../../../server/middleware/roles', () => jest.fn((req, res, next) => next()));


// const mockGetData = jest.spyOn(roles, "doctor").mockImplementation((req, res, next) => next());



// jest.mock('../../../server/middleware/roles', () => jest.fn((req, res, next) => next()));
// let roles;
beforeEach(function() {
  //  roles = require('../../../server/middleware/roles');
  // sinon.stub('../../../server/middleware/roles', doctor)
  //     .callsFake(function(req, res, next) {
  //       return next();
  //     });
  // jest.mock('../../../server/middleware/roles', () => jest.fn((req, res, next) => next()));
  // const mockGetData = jest.spyOn(roles, 'doctor').mockImplementation((req, res, next) => next());

  // jest.mock('../../../server/middleware/roles', () => ({
  //   doctor: (req, res,next) =>{ console.log('nothaappen');next();}
  // }));

});
//
//
// afterEach(function() {
//   jest.unmock('../../../server/middleware/roles')
// })

const app = require('../../../server/App.js');
const {doctor, patient, admin, doctorOrPatient} = require("../../../server/middleware/Roles");
const {auth} = require("../../../server/middleware/Auth");

jest.mock('../../../server/middleware/roles', () => ({
  doctor: (req, res,next) =>{next();},
  patient: (req, res,next) =>{next();},
  doctorOrPatient: (req, res,next) =>{next();},
  admin: (req,res,next) => {next();},
  manager: (req,res,next) => {next();},
  doctorOrImmigrationOfficer: (req,res,next) => {next();}
}));

jest.mock('../../../server/middleware/auth', () => ({
  auth: (req, res,next) =>{next();}
}));


// app;
//Here we try to get a specific patients information so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /doctorViewingPatientData', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/doctorViewingPatientData', { params: {id: 1}});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we try to get a specific patients previous symptom form information so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /doctorViewingPreviousSymptoms', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/doctorViewingPreviousSymptoms', { params: {id: 1}});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we send data to make sure that we can post to create a new row in the Viewed table of the database.
//If it does, the test will succeed and a status code of 200 will be returned to make sure the test pass.
describe('testing /markViewed', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
    let res = await request(app).post('/markViewed').send({ PatientID: 1, DoctorID: 6, datetime: '2022-04-03 00:00:00'});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we send data to make sure that we can post to update the SymptomRequested attribute in the patient table of the database.
//If it does, the test will succeed and a status code of 200 will be returned to make sure the test pass.
describe('testing /requestForm', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
    let res = await request(app).post('/requestForm').send({ PatientID: 1});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we send data to make sure that we can post to create a new row in the Viewed table of the database.
//If it does, the test will succeed and a status code of 200 will be returned to make sure the test pass.
describe('testing /flagPatient', () => {
  it('returns a status code of 200 indicating that the post worked', async () => {
    let res = await request(app).post('/flagPatient').send({ PatientID: 1, FlagPriority: 1});
    expect(res.statusCode).toEqual(200);
  })
});

//Here we try to get a list of viewed patients so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /Viewed', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/Viewed');
    expect(res.statusCode).toEqual(200);
  })
});

//Here we try to get the name and status from all patients in the DB so that it can be displayed in the UI.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /DoctorPatientProfile', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/DoctorPatientProfile');
    expect(res.statusCode).toEqual(200);
  })
});

//Here we send data to make sure that we can post to create a Symtpom form.
//If it does so, the test will succeed and a status code of 200 will be returned
//to make the test pass. This will fail after it passes, to make it pass again, 
//change the timestamp value by 1.
let dateNow = new Date();
let timeNow = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
let dayNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate()
let fullDate = dayNow + ' ' + timeNow
describe('testing /createSymptomForm', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).post('/createSymptomForm').send({patientid:1, InfoTimestamp: fullDate, weight: 25, temperature: 66, breathing: 1, chest: 2, fatigue: 1, fever: 1, cough: 5, smell: 4, taste: 2, symptoms: 'sore' , urgent:1})
        expect(res.statusCode).toEqual(200);
    })
});

//Here we send data to make sure that we can post to alter the patient's status.
//If it does so, the test will succeed and a status code of 200 will be returned
//to make the test pass.
describe('testing /createPatientCovidStatus', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).post('/createPatientCovidStatus').send({ status: 2 });
        expect(res.statusCode).toEqual(200);
    })
});

//Here we send data to make sure that we can post to edit patient data.
//If it does so, the test will succeed and a status code of 200 will be returned
//to make the test pass.
describe('testing /editedPatientData', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).post('/editedPatientData').send({ fname: 'Maxime', lname: 'Giroux', email: 'giroux2000@gmail.com', phone: '514 514 5145', healthinsurance: 'test'});
        expect(res.statusCode).toEqual(200);
    })
});

//Here we just try to get the patient profile data.
//If the get is successful, a 200 status code will be returned
//to make the test pass.
describe('testing /patientProfileData', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).get('/patientProfileData');
        expect(res.statusCode).toEqual(200);
    })
});

//Here we just try to get the patient profile data so that it can be edited.
//If the get is successful, a 200 status code will be returned
//to make the test pass.
describe('testing /editPatientProfileData', () => {
    it('returns a status code of 200 indicating that the post worked', async () => {
        let res = await request(app).get('/editPatientProfileData');
        expect(res.statusCode).toEqual(200);
    })
});

//Here we just try to login with a known email and password
//If the get is successful, a 200 status code will be returned
//to make the test pass.
//Currently this test does not work


// describe('testing /Login', () => {
//   it('returns a status code of 200 indicating that the post worked', async () => {
//       let res = await request(app).post('/Login').send({email:'e.han@hotmail.com',password: '@Root1234'});
//       expect(res.status).toEqual(200);
//   })
// });

//Here we just try to get the patient profile data so that it can be edited.
//If the get is successful, a 200 status code will be returned
//to make the test pass.
// describe('testing /Signup', () => {
//   it('returns a status code of 200 indicating that the post worked', async () => {
//       let res = await request(app).post('/Signup').send({firstName: 'Matt', lastName:'Pop', email:'e.han@hotmail.com',password: '@Root1234', userRole:'Doctor',phoneNumber:'5146683216'});
//       expect(res.status).toEqual(200);
//   })
// });


// describe('testing /seeOpenAppointments', () => {
//   it('returns an array when looking for appointment slots', async () => {
//     let res = await request(app).get('/seeOpenAppointments');
//     expect(res.body).anything();
//   })
// });

// //Here we update the Flagged attribute in the patient table of the DB to 0
// //If the post is successful, a 200 status code will be returned to make the test pass.
// describe('testing /unflagPatient', () => {
//   it('returns a status code of 200 indicating that the get worked', async () => {
//     let res = await request(app).post('/unflagPatient').send({PatientID: 1});
//     expect(res.statusCode).toEqual(200);
//   })
// });

// //Here we update the ChatPermission attribute in the patient table of the DB to 1 and the ChatRequested attribute to 0
// //If the post is succesfull, a 200 status code will be returned to make the test pass.
// describe('testing /acceptChat', () => {
//   it('returns a status code of 200 indicating that the get worked', async () => {
//     let res = await request(app).post('/acceptChat').send({PatientID: 1});
//     expect(res.statusCode).toEqual(200);
//   })
// });

// //Here we update the ChatRequested attribute in the patient table of the DB to 1
// //If the post is succesfull, a 200 status code will be returned to make the test pass.
// describe('testing /RequestChat', () => {
//   it('returns a status code of 200 indicating that the get worked', async () => {
//     let res = await request(app).post('/RequestChat');
//     expect(res.statusCode).toEqual(200);
//   })
// });

//This test verifies we are able to retrieve the status of all patients and their count
describe('testing /statusCountAllPatients', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/statusCountAllPatients');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies total patient count command
describe('testing /countAllPatients', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/countAllPatients');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies total flagged patient count command
describe('testing /countAllFlaggedPatients', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/countAllFlaggedPatients');
    expect(res.statusCode).toEqual(200);
  })
});

//Verfies total validated doctors command
describe('testing /countAllValidatedDoctors', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/countAllValidatedDoctors');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies doctors with most patients command
describe('testing /doctorsWithMostPatients', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/doctorsWithMostPatients');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies doctors with least patients commands
describe('testing /doctorsWithLeastPatients', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/doctorsWithLeastPatients');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies patients flagged but not viewed by doctor command
describe('testing /patientsFlaggedNotViewed', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/patientsFlaggedNotViewed');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies patients flagged that have been viewed in decreasing order command
describe('testing /patientsFlaggedLeastViewed', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/patientsFlaggedLeastViewed');
    expect(res.statusCode).toEqual(200);
  })
});

//Here we try to get basic contact information for all validated doctors.
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /adminViewingValidatedDoctorData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/adminViewingValidatedDoctorData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get basic contact information for all unvalidated doctors.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /adminViewingUnvalidatedDoctorData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/adminViewingUnvalidatedDoctorData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get basic contact information for all patients.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /adminViewingPatientData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/adminViewingPatientData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all patients.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingTheirPatientData', () => {
    // jest.setTimeout(30000)
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingTheirPatientData');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all doctors.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingAllDoctors', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingAllDoctors');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all patients organized by doctor.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingDoctorPatients', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingDoctorPatients');
      expect(res.statusCode).toEqual(200);
    })
  });

//Here we try to get information for all patients.
//If the get is successful, a 200 status code will be returned to make the test pass. 
  describe('testing /doctorViewingAllPatientData', () => {
    it('returns a status code of 200 indicating that the get worked', async () => {
      let res = await request(app).get('/doctorViewingAllPatientData');
      expect(res.statusCode).toEqual(200);
    })
  });

  //Here we try to validate a doctor
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /validateDoctor', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).post('/validateDoctor').send({DoctorID: 6});
    expect(res.statusCode).toEqual(200);
  })
});


//Verifies patients flagged that have no filled out symptom form command
describe('testing /patientsFlaggedNoSymptomFormResponse', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/patientsFlaggedNoSymptomFormResponse');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies retrieve all notifications command
describe('testing /retrieveAllNotifications', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/retrieveAllNotifications');
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies get the total number of notifications command
describe('testing /getAllNotificationCount', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).post('/getAllNotificationCount').send({id: 1});
    expect(res.statusCode).toEqual(200);
  })
});

//Max
//Verifies the command that gets validated health officials
describe('testing /adminViewingValidatedHealthOfficalData', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/adminViewingValidatedHealthOfficalData');
    expect(res.statusCode).toEqual(200);
  })
});
//Verifies get all of the live chat messages for a patient
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /liveChatMessages', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/liveChatMessages', { params: {id: 1}});
    expect(res.statusCode).toEqual(200);
  })
});


//Max
//Verifies the command that gets unvalidated health officials
describe('testing /adminViewingUnvalidatedHealthOfficalData', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/adminViewingUnvalidatedHealthOfficalData');
    expect(res.statusCode).toEqual(200);
  })
});

//Max
//Verifies the command that gets validated immigration officers
describe('testing /adminViewingValidatedImmigrationOfficerData', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/adminViewingValidatedImmigrationOfficerData');
    expect(res.statusCode).toEqual(200);
  })
});

//Max
//Verifies the command that gets validated immigration officers
describe('testing /adminViewingUnvalidatedImmigrationOfficerData', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/adminViewingUnvalidatedImmigrationOfficerData');
    expect(res.statusCode).toEqual(200);
  })
});

//Max
//Verifies the command validates a health official
describe('testing /validateHealthOfficial', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).post('/validateHealthOfficial').send({HealthOfficialID : 16});
    expect(res.statusCode).toEqual(200);
  })
});

//Max
//Verifies the command invalidates a health official
// describe('testing /invalidateHO', () => {
//   it('returns a status code of 200 indicating that the get worked', async () => {
//     let res = await request(app).post('/validateHO').send({HealthOfficialID : 16});
//     expect(res.statusCode).toEqual(200);
//   })
// });

//Max
//Need to verify if there's a way that we will implement to fake sign up
//Verifies the command validates a immigration officer
describe('testing /validateImmigrationOfficer', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).post('/validateImmigrationOfficer').send({ImmigrationOfficerID : 14});
    expect(res.statusCode).toEqual(200);
  })
});

//Max
//Need to see if there's a way that we will implement to fake sign up
//Verifies the command invalidates a immigration officer
// describe('testing /invalidateIO', () => {
//   it('returns a status code of 200 indicating that the get worked', async () => {
//     let res = await request(app).post('/validateIO').send({ImmigrationOfficerID : 16});
//     expect(res.statusCode).toEqual(200);
//   })
// });

//Max
//Verifies that patients can be reassigned
//Will need to create fake chats and a fake patient/doctor
// describe('testing /reassignPatient', () => {
//   it('returns a status code of 200 indicating that the get worked', async () => {
//     let res = await request(app).post('/reassignPatient').send({PatientID : 1, DoctorID: 6});
//     expect(res.statusCode).toEqual(200);
//   })
// });

//Verifies get the patient and doctor names
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /patientDoctorName', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
    let res = await request(app).get('/patientDoctorName', { params: {id: 1}});
    expect(res.statusCode).toEqual(200);
  })
});

//Verifies get the patient current appointment slot
//If the get is successful, a 200 status code will be returned to make the test pass. 
describe('testing /seeCurrentPatientAppointment', () => {
  it('returns a status code of 200 indicating that the get worked', async () => {
  request(app).get('/seeCurrentPatientAppointment').query({id: 1}).expect(200);
  })
});
