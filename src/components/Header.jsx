// Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" style={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Employee Attendance Dashboard
        </Typography>
        <Avatar alt="Alice Turner" src="/static/images/avatar/1.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
