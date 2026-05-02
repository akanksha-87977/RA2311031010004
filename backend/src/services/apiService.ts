import axios, { AxiosInstance } from 'axios';
import { NotificationResponse } from '../types/notification.types';
import { logger } from '../utils/logger';

class ApiService {
  private client: AxiosInstance;
  private readonly baseURL: string;

  constructor() {
    this.baseURL = 'http://20.207.122.201/evaluation-service';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Fetch notifications from the API
   * No modification to response structure
   */
  async fetchNotifications(): Promise<NotificationResponse> {
    const endpoint = '/notifications';
    
    logger.info('API Call Started', { endpoint: this.baseURL + endpoint });

    try {
      const response = await this.client.get<NotificationResponse>(endpoint);
      
      logger.info('API Call Completed Successfully', {
        endpoint: this.baseURL + endpoint,
        statusCode: response.status,
        notificationCount: response.data.notifications?.length || 0
      });

      // Return EXACT response structure without modification
      return response.data;

    } catch (error: any) {
      logger.error('API Call Failed', {
        endpoint: this.baseURL + endpoint,
        error: error.message,
        statusCode: error.response?.status,
        responseData: error.response?.data
      });

      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }
}

export const apiService = new ApiService();