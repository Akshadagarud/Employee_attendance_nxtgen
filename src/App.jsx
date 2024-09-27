import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/admin_login/LoginPage';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/admin_dashboard/Dashboard';
import AddEmployee from './components/employees/add_emp'; // Import the AddEmployee component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
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
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
