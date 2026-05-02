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
  SelectChangeEvent
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { NotificationType } from '../types/notification.types';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationList } from '../components/NotificationList';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export default function AllNotifications() {
  const router = useRouter();
  const [filterType, setFilterType] = useState<NotificationType | 'All'>('All');
  const [limit, setLimit] = useState<number>(20);

  const { notifications, loading, error, viewedIds, newIds, markAsViewed, refresh } =
    useNotifications({ limit });

  // Client-side filtering by type
  const filteredNotifications = useMemo(() => {
    if (filterType === 'All') {
      return notifications;
    }
    return notifications.filter(n => n.Type === filterType);
  }, [notifications, filterType]);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setFilterType(event.target.value as NotificationType | 'All');
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(Number(event.target.value));
  };

  const handleNotificationClick = (id: string) => {
    markAsViewed(id);
  };

  // Statistics
  const stats = useMemo(() => {
    const total = filteredNotifications.length;
    const unread = filteredNotifications.filter(n => !viewedIds.has(n.ID)).length;
    const newCount = filteredNotifications.filter(n => newIds.has(n.ID)).length;

    return { total, unread, newCount };
  }, [filteredNotifications, viewedIds, newIds]);

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
            <Typography variant="h4" fontWeight="bold">
              All Notifications
            </Typography>
          </Box>
          <Button
            startIcon={<RefreshIcon />}
            onClick={refresh}
            variant="contained"
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {/* Statistics */}
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Notifications
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {stats.unread}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Unread
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {stats.newCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by Type</InputLabel>
              <Select value={filterType} onChange={handleTypeChange} label="Filter by Type">
                <MenuItem value="All">All Types</MenuItem>
                <MenuItem value="Placement">Placement</MenuItem>
                <MenuItem value="Result">Result</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Limit</InputLabel>
              <Select value={limit.toString()} onChange={handleLimitChange} label="Limit">
                <MenuItem value="10">10 Notifications</MenuItem>
                <MenuItem value="20">20 Notifications</MenuItem>
                <MenuItem value="50">50 Notifications</MenuItem>
                <MenuItem value="100">100 Notifications</MenuItem>
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
          notifications={filteredNotifications}
          viewedIds={viewedIds}
          newIds={newIds}
          onNotificationClick={handleNotificationClick}
          emptyMessage={
            filterType === 'All'
              ? 'No notifications available'
              : `No ${filterType} notifications found`
          }
        />
      )}
    </Box>
  );
}