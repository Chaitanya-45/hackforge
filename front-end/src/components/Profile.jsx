import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { auth, database} from '../firebase/firebase';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = database.ref(`users/${user.uid}`);
          const snapshot = await userRef.once('value');
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setError('User data not found.');
          }
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError('User not authenticated.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <Typography variant="body2" color="error" sx={{ textAlign: 'center', marginTop: 2 }}>{error}</Typography>;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
      <Paper style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        borderRadius: 16,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        maxWidth: 500,
        width: '100%',
        textAlign: 'center',
      }}>
        {error ? (
          <Typography variant="body2" color="error">{error}</Typography>
        ) : userData ? (
          <>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 8 }}>Username: {userData.username}</Typography>
            <Typography variant="body1" style={{ marginBottom: 8 }}>Email: {userData.email}</Typography>
            <Typography variant="body1" style={{ marginBottom: 8 }}>Phone Number: {userData.phoneNumber}</Typography>
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Paper>
    </div>
  );
};

export default Profile;
