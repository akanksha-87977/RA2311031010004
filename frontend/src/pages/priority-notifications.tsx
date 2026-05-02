import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Grid,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  PriorityHigh as PriorityIcon
} from '@mui/icons-material';
import { useNotifications } from '../hooks/useNotifications';
import { notificationService } from '../services/notificationService';
import { NotificationList } from '../components/NotificationList';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { NotificationResponse } from '../types/notification.types';

export default function PriorityNotifications() {
  const router = useRouter();
  const [selectedLimit, setSelectedLimit] = useState<number>(10);

  // Fetch all notifications
  const { notifications, loading, error, viewedIds, newIds, markAsViewed, refresh } =
    useNotifications();

// Apply priority logic client-side (same as backend logic)
  const priorityNotifications = useMemo(() => {
    if (notifications.length === 0) {
      return [];
    }

    // Pass the notifications array directly as first parameter
    const response = notificationService.getPriorityNotifications(
      { notifications } as NotificationResponse,
      selectedLimit
    );

    return response.notifications;
  }, [notifications, selectedLimit]);

  const handleLimitChange = (event: SelectChangeEvent) => {
    setSelectedLimit(Number(event.target.value));
  };

  const handleNotificationClick = (id: string) => {
    markAsViewed(id);
  };

  // Statistics
  const stats = useMemo(() => {
    const placement = priorityNotifications.filter(n => n.Type === 'Placement').length;
    const result = priorityNotifications.filter(n => n.Type === 'Result').length;
    const event = priorityNotifications.filter(n => n.Type === 'Event').length;

    return { placement, result, event };
  }, [priorityNotifications]);

  return (
    <Box>
      {/* Header */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/')}
              variant="outlined"
            >
              Back
            </Button>
            <Box display="flex" alignItems="center" gap={1}>
              <PriorityIcon color="success" fontSize="large" />
              <Typography variant="h4" fontWeight="bold">
                Priority Notifications
              </Typography>
            </Box>
          </Box>
          <Button
            startIcon={<RefreshIcon />}
            onClick={refresh}
            variant="contained"
            color="success"
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {/* Info Alert */}
      <Alert severity="info" sx={{ marginBottom: 3 }}>
        <Typography variant="body2">
          <strong>Priority Logic:</strong> Placement &gt; Result &gt; Event. Within same type,
          newer notifications appear first.
        </Typography>
      </Alert>

      {/* Statistics */}
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              padding: 2,
              textAlign: 'center',
              border: '2px solid #4caf50',
              backgroundColor: '#e8f5e9'
            }}
          >
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {stats.placement}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Placement
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              padding: 2,
              textAlign: 'center',
              border: '2px solid #2196f3',
              backgroundColor: '#e3f2fd'
            }}
          >
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {stats.result}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Result
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              padding: 2,
              textAlign: 'center',
              border: '2px solid #ff9800',
              backgroundColor: '#fff3e0'
            }}
          >
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {stats.event}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Event
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Limit Selector */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography variant="body1">
              Select the number of top priority notifications to display:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Number of Notifications</InputLabel>
              <Select
                value={selectedLimit.toString()}
                onChange={handleLimitChange}
                label="Number of Notifications"
              >
                <MenuItem value="10">Top 10</MenuItem>
                <MenuItem value="15">Top 15</MenuItem>
                <MenuItem value="20">Top 20</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <NotificationList
          notifications={priorityNotifications}
          viewedIds={viewedIds}
          newIds={newIds}
          onNotificationClick={handleNotificationClick}
          emptyMessage="No priority notifications available"
        />
      )}
    </Box>
  );
}