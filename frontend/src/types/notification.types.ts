export type NotificationType = 'Event' | 'Result' | 'Placement';

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

export interface NotificationResponse {
  notifications: Notification[];
}

export interface NotificationState {
  viewedIds: Set<string>;
  newIds: Set<string>;
}