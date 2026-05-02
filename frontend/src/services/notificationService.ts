import axios, { AxiosInstance } from 'axios';
import { Notification, NotificationResponse, NotificationType } from '../types/notification.types';

class NotificationService {
  private client: AxiosInstance;
  private readonly baseURL: string;

  constructor() {
    this.baseURL = 'http://20.207.122.201/evaluation-service';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Fetch all notifications from API
   */
  async fetchNotifications(params?: {
    limit?: number;
    page?: number;
    notification_type?: NotificationType;
  }): Promise<NotificationResponse> {
    try {
      const response = await this.client.get<NotificationResponse>('/notifications', {
        params
      });

      // Return EXACT response structure without modification
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  /**
   * Client-side priority filtering
   * Mimics backend logic for priority notifications
   */
  getPriorityNotifications(
    allNotifications: NotificationResponse,
    limit: number = 10
  ): NotificationResponse {
    const priorityMap: Record<NotificationType, number> = {
      'Placement': 3,
      'Result': 2,
      'Event': 1
    };

    // Sort by priority, then by timestamp
    const sorted = [...allNotifications.notifications].sort((a, b) => {
      const priorityA = priorityMap[a.Type];
      const priorityB = priorityMap[b.Type];

      // Different types: higher priority first
      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      // Same type: newer timestamp first
      const timeA = new Date(a.Timestamp).getTime();
      const timeB = new Date(b.Timestamp).getTime();
      return timeB - timeA;
    });

    // Return EXACT same structure
    return {
      notifications: sorted.slice(0, limit)
    };
  }
}

export const notificationService = new NotificationService();