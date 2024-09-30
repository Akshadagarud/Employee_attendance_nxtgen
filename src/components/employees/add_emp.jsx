import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './add_emp.css';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee data:', employee);
    // Reset form after submission
    setEmployee({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      mobileNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    });
  };

  return (
    <Paper className="add-employee-form" elevation={3}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        New Employee Registration Form
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Please fill out the form to complete your registration. Thank you!
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>Personal Information</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={employee.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={employee.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        
        <Typography variant="h6" gutterBottom style={{marginTop: '20px'}}>Contact Information</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={employee.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={employee.mobileNumber}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        
        <Typography variant="h6" gutterBottom style={{marginTop: '20px'}}>Address</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={employee.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={employee.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="State"
              name="state"
              value={employee.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Country"
              name="country"
              value={employee.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Zip Code"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Register Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddEmployee;
