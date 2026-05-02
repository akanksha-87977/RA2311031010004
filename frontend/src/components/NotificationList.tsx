import React from 'react';
import { Box, Typography } from '@mui/material';
import { Notification } from '../types/notification.types';
import { NotificationCard } from './NotificationCard';

interface NotificationListProps {
  notifications: Notification[];
  viewedIds: Set<string>;
  newIds: Set<string>;
  onNotificationClick: (id: string) => void;
  emptyMessage?: string;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  viewedIds,
  newIds,
  onNotificationClick,
  emptyMessage = 'No notifications available'
}) => {
  if (notifications.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
      >
        <Typography variant="h6" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
          isViewed={viewedIds.has(notification.ID)}
          isNew={newIds.has(notification.ID)}
          onClick={() => onNotificationClick(notification.ID)}
        />
      ))}
    </Box>
  );
};