import { Notification, NotificationResponse, PriorityNotificationParams } from '../types/notification.types';
import { apiService } from './apiService';
import { PriorityQueue } from '../utils/priorityQueue';
import { logger } from '../utils/logger';

class NotificationService {
  /**
   * Get top N priority notifications using optimized heap approach
   * 
   * Time Complexity: O(n log k) where n is total notifications, k is limit
   * Space Complexity: O(k) for the heap
   * 
   * This is more efficient than sorting entire dataset O(n log n)
   */
  async getPriorityNotifications(params: PriorityNotificationParams = {}): Promise<NotificationResponse> {
    const limit = params.limit || 10;
    
    logger.info('Processing Priority Notifications', { limit });

    try {
      // Step 1: Fetch data from API
      logger.debug('Step 1: Fetching notifications from API');
      const response = await apiService.fetchNotifications();
      const allNotifications = response.notifications;

      logger.info('Notifications fetched', { totalCount: allNotifications.length });

      // Step 2: Process using Min Heap (Priority Queue)
      logger.debug('Step 2: Building priority queue');
      const priorityQueue = new PriorityQueue();

      // Insert all notifications into heap
      // Heap maintains top N by removing lowest priority when size exceeds N
      for (const notification of allNotifications) {
        priorityQueue.insert(notification);
        
        // Maintain only top N elements
        // This optimization prevents heap from growing too large
        if (priorityQueue.size() > limit) {
          priorityQueue.maintainSize(limit);
        }
      }

      logger.debug('Priority queue built', { heapSize: priorityQueue.size() });

      // Step 3: Extract all from heap (they're already top N)
      logger.debug('Step 3: Extracting priority notifications');
      const priorityNotifications: Notification[] = [];
      
      while (priorityQueue.size() > 0) {
        const notification = priorityQueue.extractMin();
        if (notification) {
          priorityNotifications.push(notification);
        }
      }

      // Step 4: Reverse to get highest priority first (heap gave us min first)
      const sortedNotifications = priorityNotifications.reverse();

      logger.info('Priority notifications processed', {
        totalFetched: allNotifications.length,
        priorityReturned: sortedNotifications.length
      });

      // Return EXACT same structure as API response
      return {
        notifications: sortedNotifications
      };

    } catch (error: any) {
      logger.error('Error processing priority notifications', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Get all notifications without filtering
   * Used for "All Notifications" page
   */
  async getAllNotifications(): Promise<NotificationResponse> {
    logger.info('Fetching all notifications');
    
    try {
      const response = await apiService.fetchNotifications();
      
      logger.info('All notifications fetched', {
        count: response.notifications.length
      });

      // Return EXACT response without modification
      return response;

    } catch (error: any) {
      logger.error('Error fetching all notifications', {
        error: error.message
      });
      throw error;
    }
  }
}

export const notificationService = new NotificationService();