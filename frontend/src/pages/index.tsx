import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  PriorityHigh as PriorityIcon
} from '@mui/icons-material';

export default function Home() {
  const router = useRouter();

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 4,
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Campus Notifications System
        </Typography>
        <Typography variant="h6">
          Stay updated with all campus events, results, and placements
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* All Notifications Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={4}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)'
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <NotificationsIcon
                  sx={{ fontSize: 60, color: '#1976d2', marginRight: 2 }}
                />
                <Typography variant="h4" component="h2">
                  All Notifications
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                Browse all notifications with advanced filtering options:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">Filter by type (Event, Result, Placement)</Typography>
                </li>
                <li>
                  <Typography variant="body2">Pagination support</Typography>
                </li>
                <li>
                  <Typography variant="body2">Track read/unread status</Typography>
                </li>
                <li>
                  <Typography variant="body2">View complete notification history</Typography>
                </li>
              </ul>
            </CardContent>
            <CardActions sx={{ padding: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => router.push('/all-notifications')}
              >
                View All Notifications
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Priority Notifications Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={4}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)'
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <PriorityIcon
                  sx={{ fontSize: 60, color: '#4caf50', marginRight: 2 }}
                />
                <Typography variant="h4" component="h2">
                  Priority Notifications
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                View top priority notifications based on smart sorting:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">Placement announcements (Highest)</Typography>
                </li>
                <li>
                  <Typography variant="body2">Result declarations (Medium)</Typography>
                </li>
                <li>
                  <Typography variant="body2">Event updates (Standard)</Typography>
                </li>
                <li>
                  <Typography variant="body2">Customizable result count (10/15/20)</Typography>
                </li>
              </ul>
            </CardContent>
            <CardActions sx={{ padding: 2 }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                fullWidth
                onClick={() => router.push('/priority-notifications')}
              >
                View Priority Notifications
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Info Section */}
      <Paper sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph>
          The Campus Notifications System uses an intelligent priority algorithm to ensure
          you never miss important updates:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              🎯 Smart Prioritization
            </Typography>
            <Typography variant="body2">
              Automatically ranks notifications by importance and recency
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              ✅ Read/Unread Tracking
            </Typography>
            <Typography variant="body2">
              Visual indicators for new and viewed notifications
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              🔍 Advanced Filtering
            </Typography>
            <Typography variant="body2">
              Filter by type, pagination, and custom limits
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}