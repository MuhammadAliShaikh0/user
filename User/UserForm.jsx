import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Box, Button, Radio, RadioGroup, Typography, TextField, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 

const UserRegistration = () => {
  const [UID, setUID] = useState('');
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole] = useState('');
  const [contactInfo,setContactInfo] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();

  
    try {
      await addDoc(collection(db, 'userhms'), {
        Name,
        email,
        password,
        role,
        contactInfo,
        UID,
      });
      
      setUID('');
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setContactInfo('');
      
      
      navigate('/userdetails');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
        
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textDecoration: 'underline',
            marginBottom: 4,
            marginTop: 4,
          }}
        >
          User Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>User ID:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your ID"
              value={UID}
              onChange={(e) => setUID(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Name:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Email:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Password:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your password"
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Role:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Contact:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter contact Info"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </FormControl>

          
          

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'black',
              marginTop: 2,
              width: '100%',
              padding: '10px 0',
              marginBottom: 4,
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default UserRegistration;