// Dashboard.jsx
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      {/* Card 1 */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Average Likes</Typography>
            <Typography variant="h4">635</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 2 */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Comments Received</Typography>
            <Typography variant="h4">123</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
