import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper, FormControlLabel, Checkbox, Box } from '@mui/material';
import { auth, database, googleProvider } from '../firebase/firebase';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignUp = async () => {
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await database.ref('users/' + user.uid).set({
        username,
        phoneNumber,
        email,
      });

      setSuccessMessage('Successfully signed up!');
      setEmail('');
      setUsername('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);

      console.log('User signed up and data saved:', email, username, phoneNumber);

      setRedirectToLogin(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;

      await database.ref('users/' + user.uid).set({
        username: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });

      setSuccessMessage('Successfully signed in with Google!');
      setRedirectToLogin(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={8} md={6}>
        {successMessage && (
          <Typography variant="body2" style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#4caf50', color: '#fff', borderRadius: '4px', textAlign: 'center' }}>
            {successMessage}
          </Typography>
        )}
        <Paper style={{ padding: '24px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
            }
            label="I consent to the sharing of my email address."
            style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}
          />
          {error && (
            <Typography variant="body2" color="error" align="center" style={{ marginTop: '16px' }}>
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#007bff', // Blue color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0056b3', // Darker blue on hover
                },
              }}
              fullWidth
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#4285F4', // Google blue color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#357AE8', // Darker Google blue on hover
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '0', // Remove default padding
              }}
              fullWidth
              onClick={signupWithGoogle}
              startIcon={
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  style={{
                    height: '20px', // Adjust the size to fit well
                    width: '20px',
                    marginRight: '8px', // Space between icon and text
                  }}
                />
              }
            >
              Sign up with Google
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
