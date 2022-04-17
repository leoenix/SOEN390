import {FormControlLabel, Checkbox, Button, Typography, Grid} from '@mui/material';
import React, {useState, useEffect} from "react";
import * as moment from "moment";
import Axios from "axios";
import {Box} from '@mui/system';
import {Navigate} from "react-router-dom";


const TimeSlotCalendar = () => {
    const DAYS_TO_DISPLAY = 5; // Number of days being displayed on the page
    const TIME_SLOT_INTERVAL_IN_MINUTES = 30; // Size (in minutes) of how large the time interval is of each checkbox
    const currentDate = moment().isoWeekday(0).startOf("day"); // Setting the reference date to equal Sunday
    const [timeSlotsPerDay, setTimeSlotsPerDay] = useState([]);
    const selectedTimeSlots = []; // An array storing the data of each selected slot.
    const [previousSlots, setPreviousSlots] = useState([]);
    const [previousMonday, setPreviousMonday] = useState(Array(18).fill(false));
    const [previousTuesday, setPreviousTuesday] = useState(Array(18).fill(false));
    const [previousWednesday, setPreviousWednesday] = useState(Array(18).fill(false));
    const [previousThursday, setPreviousThursday] = useState(Array(18).fill(false));
    const [previousFriday, setPreviousFriday] = useState(Array(18).fill(false));
    const previousDaysArray = [previousMonday, previousTuesday, previousWednesday, previousThursday, previousFriday];
    const calculatedTimeSlots = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    // Display the appropriate time slots whenever a Docotr clicks on a checkbox

    const handleChange = (event, timeSlot, index) => {
        // changing the appropriate day boolean values according to the index
        switch (timeSlot.day){
            case 'Monday':
                setPreviousMonday(prevState => prevState.map((item, idx) => idx === index ? !item : item));
                break;
            case 'Tuesday':
                setPreviousTuesday(prevState => prevState.map((item, idx) => idx === index ? !item : item));
                break;
            case 'Wednesday':
                setPreviousWednesday(prevState => prevState.map((item, idx) => idx === index ? !item : item));
                break;
            case 'Thursday':
                setPreviousThursday(prevState => prevState.map((item, idx) => idx === index ? !item : item));
                break;
            case 'Friday':
                setPreviousFriday(prevState => prevState.map((item, idx) => idx === index ? !item : item));
                break;
        }

      if (event.target.checked) {
            selectedTimeSlots.push(timeSlot);
        } else {
            previousSlots.splice(previousSlots.findIndex(slot => slot.StartTime.substr(0, 5) === timeSlot.label.substr(0, 5) && slot.dayName === timeSlot.day.substr(0, 3)), 1);

            const indexToRemove = selectedTimeSlots.indexOf(timeSlot);
            if (indexToRemove > -1) {
                selectedTimeSlots.splice(indexToRemove, 1); // 2nd parameter means remove one item only
            }
        }
    };

    // Creates the collumn for each day - associates the day name ex. "Monday" with the time slots
    const calculateTimeSlots = (startHour, endHour) => {


        const numberOfTimeSlots = (endHour - startHour) / (TIME_SLOT_INTERVAL_IN_MINUTES / 60);

        // Loop that creates the day ex: "Monday" and each interation increments the day to store the next day.
        for (var i = 0; i < DAYS_TO_DISPLAY; i++) {
            let day = currentDate.add(1, "days");
            let timeSlots = {
                day: day.format("dddd"),
                slots: [],
            };


            // the date will be Date-00-00-00, whatever, midnight, so add enough hours to get to your start time, so 8 am
            let incrementedTime = moment(day).add(startHour, "h");

            // Loop to create the interval times aka 08:00 - 17:00 and stores them into an array of timeSlots, each interation of the loop increases the "startTime" by 30 minutes.
            for (var j = 0; j < numberOfTimeSlots; j++) {
                let intervalEnd = moment(incrementedTime).add(TIME_SLOT_INTERVAL_IN_MINUTES, "m");
                timeSlots.slots.push({
                    label: `${incrementedTime.format("hh:mm")} - ${intervalEnd.format("hh:mm")}`,
                    day: `${day.format("dddd")}`,
                    startTime: incrementedTime,
                    endTime: intervalEnd,
                });
                incrementedTime.add(TIME_SLOT_INTERVAL_IN_MINUTES, "m");
            }

            // Pushing the data of the time slots for the day to a larger array, which will contain the times slots for each day
            calculatedTimeSlots.push(timeSlots);
        }
        setTimeSlotsPerDay(calculatedTimeSlots);

    };
    const getDoctorSchedule = () => {
        Axios.get("http://localhost:8080/doctorFilledSlots", {params: {id: localStorage.getItem('id')}, withCredentials:true}).then((response) => {

            //array of false has a false value for each day for each possible increment (18 total increments for each day).
            let arrayOfFalse = new Array(5);
            for (let y = 0; y < arrayOfFalse.length; y++){
            arrayOfFalse[y] = new Array(18).fill(false);}
            // filtering schedule by day and then finding the indexes representing the increments that are in the day
            days.forEach((day, index)=> {
                let temp = [];
                temp = response.data.filter(s => s.dayName === day);
                let dayIndexes = [];
                temp.forEach(t => {
                    if (t) {
                        dayIndexes.push(calculatedTimeSlots[0].slots.findIndex(s => s.label.substr(0, 5) === t.StartTime.substr(0, 5)));
                    }

                });
                // updating the appropriate day and increment with a truth value if value is in response
                dayIndexes.forEach((dayIdx) => arrayOfFalse[index][dayIdx] = true);

            })
           setPreviousMonday(arrayOfFalse[0]);
            setPreviousTuesday(arrayOfFalse[1]);
            setPreviousWednesday(arrayOfFalse[2]);
            setPreviousThursday(arrayOfFalse[3]);
            setPreviousFriday(arrayOfFalse[4]);
        }).catch((err) => console.log(err));

    }

    const submit = () => {
        // Iterates through each selected time slot and sends the data to the database
        let backendTimeSlots = [];
        // for each day state we check the boolean values for increments and if they are true then we push to backend array
        previousDaysArray.forEach((previousDay, previousDayIndex) =>{
            previousDaysArray[previousDayIndex].forEach((value, index) =>{
                if (value === true){
                    backendTimeSlots.push({
                        day: timeSlotsPerDay[previousDayIndex].day.substr(0,3),
                        doctorID: localStorage.getItem('id'),
                        startTime: timeSlotsPerDay[previousDayIndex].slots[index].label.substr(0, 5).concat(":00"),
                        endTime: timeSlotsPerDay[previousDayIndex].slots[index].label.substr(8, 14).concat(":00")
                    })
                }
            })
        })
;
        // Posts the json object containing the doctor's times to the server and awaits a confirmation response
        let doctorScheduleData = {backendTimeSlots}
        Axios.post('http://localhost:8080/doctorAvailbility', doctorScheduleData, {withCredentials: true}).then(res => {
            console.log(res);
            alert("New time slots properly registered");
            window.location.href = "/"
        }).catch((err) => {
            console.log(err);
        });

    }
    //runs the calculateTimeSlots function whenever this page is loaded
    useEffect(() => {

        getDoctorSchedule();
        calculateTimeSlots(8, 17);

    }, []);
    // Returning the page - displaying each element such as day name, and all checkbox containers after passing in the data to TimeSLotDayTable which creates the HTML / MUI components
    return <Box sx={{p: 10}}>
        {timeSlotsPerDay.length > 0 && timeSlotsPerDay.map((timeSlotsOnDay, index) =>
            <TimeSlotDayTable dayState={timeSlotsOnDay.day === 'Monday' ? previousMonday : timeSlotsOnDay.day === 'Tuesday'
                ? previousTuesday : timeSlotsOnDay.day === 'Wednesday' ? previousWednesday : timeSlotsOnDay.day === 'Thursday'
                 ? previousThursday : previousFriday} handleChange={handleChange} key={`${index}`} day={timeSlotsOnDay.day}
                              slots={timeSlotsOnDay.slots} />)}

        <Button type="submit" variant="contained" sx={{mt: 3, mb: 2, ml: 7}} onClick={submit}>
            Submit
        </Button>
    </Box>;
};
const checkChange = e =>
    e.target.checked;

function TimeSlotDayTable(props) {
    // Object destructuring, get the day and timeSlots properties from props,
    //which we passed in when we used .map in the TimeSlotCalendar component
    const {day, slots, handleChange, previousSlots, dayState} = props;

    return (
        <>
            {
                localStorage.getItem("role") != 'Doctor' && <Navigate to={"/"} refresh={true}/>
            }

            <Grid>
                <Typography component="h1" variant="h3" sx={{mt: 5, mb: 5, ml: 7}}>
                    {day}
                </Typography>
                <Grid>
                    {previousSlots && previousSlots.length}
                    {slots.map((timeSlot, index) => (
                        // Displaying the checkboxes
                        <FormControlLabel sx={{ml: 6}} key={`${day} - ${timeSlot.label}`}
                                          control={<Checkbox checked={dayState[index]}/>}
                                          onChange={(event) => handleChange(event, timeSlot, index)}
                                          label={timeSlot.label}/>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default TimeSlotCalendar;