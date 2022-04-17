import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Box, Button, AppBar, Toolbar, IconButton, Typography, Menu, Avatar, Tooltip, Badge, Link, } from '@mui/material';
 import { useEffect } from 'react';
 import Axios from 'axios';
 import Common from './Common';

let pages = [];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [pagesTest, setPagesTest] = React.useState([]);
    var [count, setCount] = React.useState(); //number of notifications set as count

    //Handles all the possiblity for the menu
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // instantiate navbar differently depending on correct role
    function instantiateNavBar() {
        {
            setPagesTest(pages);
            //This will show the appropriate page based on who is logged in
            if (localStorage.getItem('role') === null) {
                pages.push(['Login', 'Login']);
                pages.push(['Signup', 'Signup']);
            }
            if (localStorage.getItem('role') === 'Patient') {
                pages.push(['PatientProfile', 'profile']);
                pages.push(['PatientAppointment', 'Appointment']);

            }
            if (localStorage.getItem('role') === 'Admin') {
                pages.push(['AdminDashboard', 'Dashboard']);
                pages.push(['AdminPatientDashboard', 'Patients']);
            }
            if (localStorage.getItem('role') === 'Doctor') {
                pages.push(['DoctorDashboard', 'Dashboard']);
                pages.push(['DoctorPatientProfile', 'Patients']);
                pages.push(['DoctorSchedule', 'Schedule']);

            }
            if (localStorage.getItem('role') === 'Health Official') {
                pages.push(['HealthOfficialPatientProfile', 'Patients']);

            }
            if (localStorage.getItem('role') === 'Immigration Officer') {
                pages.push(['ImmigrationOfficerPatientProfile', 'Patients']);
            }
            if (localStorage.getItem('role') != null) {
                pages.push(['Logout', 'Logout']);
            }
        }
    }

    function logout() {
        //Clears the local storage which contains all the user's information
        Axios.post('http://localhost:8080/Logout', {}, { withCredentials: true }).then(() => {
            localStorage.clear();
            return new Promise(((resolve, reject) => {
                Axios.get(
                    'http://localhost:8080/checkAuth', { withCredentials: true }).catch(err => {
                        window.location.reload();
                    })
            }))


        });
    }

    //function to get the number of notifications to be used
    function getNotificationsCount() { // first getting notifs related to appointments
        Axios.get('http://localhost:8080/retrieveAllNotifications', {
            params: {
                id: localStorage.getItem('id')
            }, withCredentials:true
        }).then((response) => { //getting notifs specific to forms
            Axios.get('http://localhost:8080/retrieveFormNotifications', {params: {
                id: localStorage.getItem('id')
            }, withCredentials:true}).then(response2 => {
                setCount(response.data.length + response2.data.length);
            })
            console.log('Notification List:');
            console.log(response.data);
        }).catch((err) => console.log(err));
    }
    // these  functions are called when navbar is rendered
    useEffect(() => {
        instantiateNavBar();
        if (localStorage.getItem('role') === 'Doctor'){
        getNotificationsCount();}
    }, [])

    return (
        <AppBar position='sticky'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Button variant='h6' component='div' href='/' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
                        <Link href='/' sx={{ color: 'white', textDecoration: 'none' }}>
                            <Typography component='h1' variant='h5'>
                                COVID-19 App
                            </Typography>
                        </Link>
                    </Button>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar'
                            aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu id='menu-appbar' anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }}>
                            {/* Displays menu bar in small screen format */}
                            {pages.map((page) => (
                                 page[0] === 'Logout' ?
                                 <Button key={page[0]} onClick={logout} sx={{ my: 2, color: 'primary', display: 'block' }}>
                                     {page[1]}
                                 </Button> :
                                 <Button key={page[0]} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'primary', display: 'block' }} href={`/${page[0]}`}>
                                     {page[1]}
                                 </Button>
                            ))}
                        </Menu>
                    </Box>
                    <Link href='/' sx={{ color: 'white', textdecoration: 'none', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        COVID-19 App
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* displays proper page based on if the page is Logout */}
                        {pages.map((page) => (
                            page[0] === 'Logout' ?
                                <Button key={page[0]} onClick={logout} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page[1]}
                                </Button> :
                                <Button key={page[0]} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} href={`/${page[0]}`}>
                                    {page[1]}
                                </Button>
                        ))}
                    </Box>
                    {localStorage.getItem('role') &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Badge color='secondary' badgeContent={count}>
                                <Tooltip title='Open settings'>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {localStorage.getItem('role') === 'Patient' &&
                                            <Avatar alt='Remy Sharp' src='https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg' />}
                                        {localStorage.getItem('role') === 'Doctor' &&
                                            <Avatar alt='Remy Sharp' src='https://thumbnail.imgbin.com/20/13/16/imgbin-profession-job-computer-icons-user-profile-avatar-doctor-cartoon-0UHE4i8tiPvnj2bjTRnTZ2nnf_t.jpg' />}
                                        {localStorage.getItem('role') === 'Admin' &&
                                            <Avatar alt='Remy Sharp' src='https://www.clipartmax.com/png/middle/344-3449008_vector-avatars-circle-avatar.png' />}
                                        {/* Immigration Officer and Health Official will have different avatars */}
                                        {localStorage.getItem('role') === 'Immigration Officer' &&
                                            <Avatar alt='Remy Sharp' src='https://www.clipartmax.com/png/middle/344-3449008_vector-avatars-circle-avatar.png' />}
                                        {localStorage.getItem('role') === 'Health Official' &&
                                            <Avatar alt='Remy Sharp' src='https://www.clipartmax.com/png/middle/344-3449008_vector-avatars-circle-avatar.png' />}
                                    </IconButton>
                                </Tooltip>
                            </Badge>
                            {/* Displays the menu option when the avatar is pressed */}
                            <Menu sx={{ mt: '45px' }} id='menu-appbar' anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                {/* Shows the notification button only if the doctor has notifications */}
                                {
                                    count > 0 && 
                                    <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'primary', display: 'block' }} href= 'DoctorDashboard'>
                                        Notifications
                                    </Button>
                                }
                                {pages.map((page) => (
                                    page[0] === 'Logout' ?
                                        <Button key={page[0]} onClick={logout} sx={{ my: 2, color: 'primary', display: 'block' }}>
                                            {page[1]}
                                        </Button> :
                                        <Button key={page[0]} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'primary', display: 'block' }} href={`/${page[0]}`}>
                                            {page[1]}
                                        </Button>
                                ))}
                            </Menu>
                        </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

ResponsiveAppBar.contextType = Common;

export default ResponsiveAppBar;
