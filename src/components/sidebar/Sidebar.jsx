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
    setOpen(!open);
    if (onClick) onClick();
  };

  return (
    <>
      <ListItem 
        button 
        onClick={handleClick} 
        style={{ paddingLeft: 16 * (depth + 1) }}
        className={`menu-item ${isActive ? 'active' : ''}`}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
        {children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {children && (
        <Collapse in={open || isActive} timeout="auto" unmountOnExit>
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
            <ListItem 
              button 
              onClick={() => navigate('/manage/employees/add')}
              className={`menu-item ${location.pathname === '/manage/employees/add' ? 'active' : ''}`}
            >
              <ListItemText primary="Add Employee" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => navigate('/manage/employees/list')}
              className={`menu-item ${location.pathname === '/manage/employees/list' ? 'active' : ''}`}
            >
              <ListItemText primary="Employee List" />
            </ListItem>
          </NestedMenuItem>
          <NestedMenuItem
            icon={<EventNoteIcon />}
            primary="Leaves"
            onClick={() => navigate('/manage/leaves')}
            path="/manage/leaves"
          >
            <ListItem 
              button 
              onClick={() => navigate('/manage/leaves/approve')}
              className={`menu-item ${location.pathname === '/manage/leaves/approve' ? 'active' : ''}`}
            >
              <ListItemText primary="Approve Leaves" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => navigate('/manage/leaves/report')}
              className={`menu-item ${location.pathname === '/manage/leaves/report' ? 'active' : ''}`}
            >
              <ListItemText primary="Leave Report" />
            </ListItem>
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
