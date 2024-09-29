import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/admin_login/LoginPage';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/admin_dashboard/Dashboard';
import AddEmployee from './components/employees/add_emp'; // Import the AddEmployee component
import LeaveApprovalSystem from './components/leave_atteandance/LeaveApprovalSystem'; // Import the LeaveApprovalSystem component
import LeaveCalendar from './components/leave_calendar/leave_calendar';
import LeaveBalanceReport from './components/leave_balance/leave_balance'; // Import the LeaveBalanceReport component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    // Initialize leave data when the app loads
    const initialLeaveData = [
      { start: new Date(2024, 8, 1), end: new Date(2024, 8, 5), employee: "John Doe", reason: "Vacation" },
      { start: new Date(2024, 8, 5), end: new Date(2024, 8, 7), employee: "Mike Johnson", reason: "Personal Leave" },
      { start: new Date(2024, 8, 10), end: new Date(2024, 8, 14), employee: "Emily Brown", reason: "Work from Home" },
    ];
    setLeaveData(initialLeaveData);
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    if (status) {
      localStorage.setItem('user', 'authenticated');
    } else {
      localStorage.removeItem('user');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const handleLeaveDataChange = (newLeaveData) => {
    setLeaveData(newLeaveData);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div style={{ flexGrow: 1, padding: 20 }}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Add the new route for AddEmployee */}
            <Route
              path="/manage/employees/add"
              element={
                isAuthenticated ? (
                  <AddEmployee />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Add the new route for LeaveApprovalSystem */}
            <Route
              path="/manage/leaves/approve"
              element={
                isAuthenticated ? (
                  <LeaveApprovalSystem />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Add the new route for LeaveCalendar */}
            <Route
              path="/leave-calendar"
              element={
                isAuthenticated ? (
                  <LeaveCalendar leaveData={leaveData} onLeaveDataChange={handleLeaveDataChange} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Add the new route for LeaveBalanceReport */}
            <Route
              path="/leave-balance"
              element={
                isAuthenticated ? (
                  <LeaveBalanceReport leaveData={leaveData} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
