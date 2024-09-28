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
import { useNavigate, useLocation } from 'react-router-dom';
import companyLogo from './company-logo.png';
import './Sidebar.css'; // Make sure to create this CSS file

const NestedMenuItem = ({ icon, primary, children, onClick, depth = 0, path }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname.startsWith(path);

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleToggle = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <ListItem 
        button 
        onClick={handleClick} 
        style={{ paddingLeft: 24 * (depth + 1) }}  // Increased padding multiplier
        className={`menu-item ${isActive ? 'active' : ''}`}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
        {children && (
          <ListItemIcon>
            <Box onClick={handleToggle} sx={{ cursor: 'pointer' }}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </ListItemIcon>
        )}
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {React.Children.map(children, child =>
              React.cloneElement(child, { depth: depth + 1 })
            )}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <ListItem 
          button 
          onClick={() => navigate('/dashboard')}
          className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <NestedMenuItem 
          icon={<FolderIcon />} 
          primary="Manage" 
          path="/manage"
        >
          <NestedMenuItem
            icon={<PeopleIcon />}
            primary="Employees"
            onClick={() => navigate('/manage/employees')}
            path="/manage/employees"
          >
            <NestedMenuItem
              primary="Add Employee"
              onClick={() => navigate('/manage/employees/add')}
              path="/manage/employees/add"
              depth={3}
            />
            <NestedMenuItem
              primary="Employee List"
              onClick={() => navigate('/manage/employees/list')}
              path="/manage/employees/list"
              depth={3}
            />
          </NestedMenuItem>
          <NestedMenuItem
            icon={<EventNoteIcon />}
            primary="Leaves"
            onClick={() => navigate('/manage/leaves')}
            path="/manage/leaves"
          >
            <NestedMenuItem
              primary="Manage Leaves"
              onClick={() => navigate('/manage/leaves/approve')}
              path="/manage/leaves/approve"
              depth={2}
            />
            {/* ... other leave-related items ... */}
          </NestedMenuItem>
        </NestedMenuItem>
        <ListItem button onClick={handleLogout} className="menu-item">
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
