import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Badge
} from '@mui/material';
import {
  Event as EventIcon,
  EmojiEvents as ResultIcon,
  WorkOutline as PlacementIcon,
  FiberNew as NewIcon
} from '@mui/icons-material';
import { Notification, NotificationType } from '../types/notification.types';

interface NotificationCardProps {
  notification: Notification;
  isViewed: boolean;
  isNew: boolean;
  onClick: () => void;
}

const getTypeConfig = (type: NotificationType) => {
  switch (type) {
    case 'Placement':
      return {
        icon: <PlacementIcon />,
        color: '#4caf50' as const,
        bgColor: '#e8f5e9'
      };
    case 'Result':
      return {
        icon: <ResultIcon />,
        color: '#2196f3' as const,
        bgColor: '#e3f2fd'
      };
    case 'Event':
      return {
        icon: <EventIcon />,
        color: '#ff9800' as const,
        bgColor: '#fff3e0'
      };
  }
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isViewed,
  isNew,
  onClick
}) => {
  const typeConfig = getTypeConfig(notification.Type);

  return (
    <Card
      onClick={onClick}
      sx={{
        marginBottom: 2,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isViewed ? '#fafafa' : '#ffffff',
        border: isNew ? '2px solid #4caf50' : '1px solid #e0e0e0',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box flex={1}>
            {/* Type and Status */}
            <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
              <Chip
                icon={typeConfig.icon}
                label={notification.Type}
                size="small"
                sx={{
                  backgroundColor: typeConfig.bgColor,
                  color: typeConfig.color,
                  fontWeight: 'bold'
                }}
              />
              {isNew && (
                <Chip
                  icon={<NewIcon />}
                  label="New"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              )}
              {isViewed && (
                <Chip
                  label="Viewed"
                  size="small"
                  variant="outlined"
                  sx={{ color: '#757575', borderColor: '#757575' }}
                />
              )}
            </Box>

            {/* Message */}
            <Typography
              variant="body1"
              sx={{
                marginBottom: 1,
                fontWeight: isViewed ? 'normal' : 'bold',
                color: isViewed ? 'text.secondary' : 'text.primary'
              }}
            >
              {notification.Message}
            </Typography>

            {/* Metadata */}
            <Box display="flex" gap={2}>
              <Typography variant="caption" color="text.secondary">
                ID: {notification.ID}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.Timestamp}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};