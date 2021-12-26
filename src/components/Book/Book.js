import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';


const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { bedType } = useParams();
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleDateCheckIn = (date) => {
        const newDate = { ...selectedDate}
        newDate.checkIn = date
        setSelectedDate(newDate);
    };
    const handleDateCheckOut = (date) => {
        const newDate = { ...selectedDate}
        newDate.checkOut = date
        setSelectedDate(newDate);
    };
    const handleBook=()=>{
        const newBooking = {...selectedDate, ...loggedInUser}
        fetch('http://localhost:4000/addBooking',{
            method : 'POST',
            headers :{'Content-type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
        })
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hello ! {loggedInUser.displayName} , Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In"
                        value={selectedDate.checkIn}
                        onChange={handleDateCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleDateCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </Grid>
                <Button onClick={handleBook} variant="contained" color="primary"> Book Now </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;