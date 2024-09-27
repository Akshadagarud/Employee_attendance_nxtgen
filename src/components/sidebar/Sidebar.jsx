// Sidebar.jsx
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from 'react-router-dom';
import companyLogo from './company-logo.png';
import './Sidebar.css'; // Make sure to create this CSS file

const NestedMenuItem = ({ icon, primary, children, onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (onClick) onClick();
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Drawer variant="permanent" anchor="left" className="sidebar">
      <Box className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
      </Box>
      <List>
        <ListItem button onClick={() => navigate('/dashboard')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <NestedMenuItem icon={<FolderIcon />} primary="Manage">
          <NestedMenuItem
            icon={<PeopleIcon />}
            primary="Employees"
            onClick={() => navigate('/manage/employees')}
          >
            <ListItem button className="nested-list-item" onClick={() => navigate('/manage/employees/add')}>
              <ListItemText primary="Add Employee" />
            </ListItem>
            <ListItem button className="nested-list-item" onClick={() => navigate('/manage/employees/list')}>
              <ListItemText primary="Employee List" />
            </ListItem>
          </NestedMenuItem>
          <NestedMenuItem
            icon={<EventNoteIcon />}
            primary="Leaves"
            onClick={() => navigate('/manage/leaves')}
          >
            <ListItem button className="nested-list-item" onClick={() => navigate('/manage/leaves/approve')}>
              <ListItemText primary="Approve Leaves" />
            </ListItem>
            <ListItem button className="nested-list-item" onClick={() => navigate('/manage/leaves/report')}>
              <ListItemText primary="Leave Report" />
            </ListItem>
          </NestedMenuItem>
        </NestedMenuItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
