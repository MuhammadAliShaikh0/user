import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Box, Button, Typography } from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useMediaQuery } from '@mui/material';

const columns = [
  { field: 'UID', headerName: 'UID', width: 70 },
  { field: 'Name', headerName: 'name', width: 130 },
  {field: 'email',headerName: 'Email',  width: 160,},
  {field: 'role',headerName: 'Role',  width: 160,},
  {field: 'contactInfo',headerName: 'Contact Info',  width: 160,},
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'userhms'));
      const studentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(studentData);
    };

    fetchStudents();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <Box
        sx={{
          width: isSmallScreen ? '100%' : `calc(100% - 240px)`, 
          margin: '20px auto',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '8px',
          paddingTop: '20px', 
          marginLeft: isSmallScreen ? '0' : '240px', 
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          User List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'black' }}
            onClick={() => navigate('/userregistration')}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ overflow: 'clip' }}
          />
        </Box>
      </Box>
    </div>
  );
}