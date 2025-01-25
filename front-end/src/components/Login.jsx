import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { auth, googleProvider } from '../firebase/firebase';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  if (isLoggedIn) {
    return role === 'user' ? (
      <Navigate to="/aftrbody" replace />
    ) : (
      <Navigate to="/Admin" replace />
    );
  }


  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Grid item xs={12} sm={8} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
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
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Box mt={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#007bff', // Blue color
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0056b3', // Darker blue on hover
                  },
                }}
                fullWidth
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                sx={{
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
                onClick={handleGoogleLogin}
                startIcon={
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google logo"
                    style={{
                      height: '35px', // Adjust the size to fit well
                      width: '35px',
                      marginRight: '8px', // Space between icon and text
                    }}
                  />
                }
              >
                Sign in with Google
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
