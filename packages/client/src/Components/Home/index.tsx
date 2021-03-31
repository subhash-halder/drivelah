import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import URI from '../../uri';

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    textAlign: 'center',
  },
  title: {
    flexGrow: 1,
    padding: '20px 0px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [loader, setLoader] = React.useState(false);
  const [globalError, setGlobalError] = React.useState('');
  const [globalSuccess, setGlobalSuccess] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [messageError, setMessageError] = React.useState('');

  const submitData = async () => {
    setLoader(true);
    setNameError('');
    setEmailError('');
    setMessageError('');
    setGlobalSuccess('');
    setGlobalError('');
    let validationError = false;
    if (name.length === 0) {
      validationError = true;
      setNameError('Required');
    }
    if (email.length === 0) {
      validationError = true;
      setEmailError('Required');
    }
    if (message.length === 0) {
      validationError = true;
      setMessageError('Required');
    }
    if (!validationError) {
      axios({
        method: 'post',
        url: `${URI.serverBaseURL}/contactus`,
        data: {
          email,
          name,
          message,
        },
      })
        .then((resp) => {
          if (resp.data.status === 'error') {
            setEmailError(resp.data.data.email || '');
            setNameError(resp.data.data.name || '');
            setMessageError(resp.data.data.message || '');
          } else {
            setGlobalSuccess('We have received your message succesfully');
            setName('');
            setEmail('');
            setMessage('');
          }
        })
        .catch((e) => {
          setGlobalError(e.message);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <AppBar position="static">
          <Typography variant="h3" className={classes.title}>
            Drivelah
          </Typography>
        </AppBar>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Backdrop className={classes.backdrop} open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className={classes.paper}>
          {globalError && (
            <Alert
              severity="error"
              onClose={() => {
                setGlobalError('');
              }}
            >
              {globalError}
            </Alert>
          )}
          <Typography component="h1" variant="h4">
            Contact Us
          </Typography>
          {globalSuccess && (
            <Alert
              severity="success"
              onClose={() => {
                setGlobalSuccess('');
              }}
            >
              {globalSuccess}
            </Alert>
          )}
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoFocus
              value={name}
              onChange={(data) => {
                setName(data.target.value);
              }}
              error={!!nameError}
              helperText={nameError}
              inputProps={{ maxLength: 200 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={(data) => {
                setEmail(data.target.value);
              }}
              error={!!emailError}
              helperText={emailError}
              inputProps={{ maxLength: 200 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="message"
              label="Message"
              type="text"
              rows={3}
              id="message"
              multiline
              value={message}
              onChange={(data) => {
                setMessage(data.target.value);
              }}
              error={!!messageError}
              helperText={messageError}
              inputProps={{ maxLength: 10000 }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitData}
            >
              Submit
            </Button>
          </div>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              drivelah
            </Link>{' '}
            {new Date().getFullYear()}.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
