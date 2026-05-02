export type NotificationType = 'Event' | 'Result' | 'Placement';

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string; // Format: YYYY-MM-DD HH:mm:ss
}

export interface NotificationResponse {
  notifications: Notification[];
}

export interface PriorityNotificationParams {
  limit?: number;
}