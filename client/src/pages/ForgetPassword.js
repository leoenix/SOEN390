import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { Container, Typography, Box, TextField, CssBaseline, Button, Avatar } from '@mui/material';
import { Component } from 'react';
import validator from 'validator';
import Axios from 'axios';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    // Set initial states
    this.state = { msg: '', email: '' };

    // Binding keywords keyword
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //Validating the email
    if (validator.isEmail(this.state.email)) {
      this.setState({
        msg: 'Your recovery password has been sent to your email address.',
      });
      Axios.put('http://localhost:8080/SendResetLink', {
        email: this.state.email,
      });
    } else {
      this.setState({ msg: 'Enter a valid Email!' });
    }
  }

  render() {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOpenTwoToneIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Forget Password
          </Typography>
          <Box sx={{ mt: 1 }}>
            {/* User providing the email*/}
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              value={this.state.email}
              onChange={(ev) => this.setState({ email: ev.target.value })}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={() => this.handleClick()}
              sx={{ mt: 3, mb: 2 }}
            >
              Send Recovery Email
            </Button>
            {/* Displays confirmation message based status send from server */}
            {this.state.msg}
          </Box>
        </Box>
      </Container>
    );
  }
}

export default ForgetPassword;
