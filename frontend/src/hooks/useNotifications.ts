import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationResponse, NotificationType } from '../types/notification.types';
import { notificationService } from '../services/notificationService';
import { storageUtil } from '../utils/storage';

interface UseNotificationsResult {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  viewedIds: Set<string>;
  newIds: Set<string>;
  markAsViewed: (id: string) => void;
  refresh: () => void;
}

export const useNotifications = (
  params?: {
    limit?: number;
    page?: number;
    notification_type?: NotificationType;
  }
): UseNotificationsResult => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: NotificationResponse = await notificationService.fetchNotifications(params);
      
      // EXACT data format preservation - no transformation
      setNotifications(response.notifications);

      // Load viewed state
      const viewed = storageUtil.getViewedIds();
      setViewedIds(viewed);

      // Identify new notifications
      const existingNew = storageUtil.getNewIds();
      const currentIds = new Set(response.notifications.map(n => n.ID));
      
      // Mark truly new ones
      response.notifications.forEach(notification => {
        if (!viewed.has(notification.ID) && !existingNew.has(notification.ID)) {
          existingNew.add(notification.ID);
          storageUtil.markAsNew(notification.ID);
        }
      });

      setNewIds(existingNew);

    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, [params?.limit, params?.page, params?.notification_type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const markAsViewed = useCallback((id: string) => {
    storageUtil.markAsViewed(id);
    storageUtil.removeFromNew(id);
    
    setViewedIds(prev => new Set([...prev, id]));
    setNewIds(prev => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    notifications,
    loading,
    error,
    viewedIds,
    newIds,
    markAsViewed,
    refresh
  };
};