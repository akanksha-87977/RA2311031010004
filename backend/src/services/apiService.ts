import { Notification, NotificationResponse } from '../types/notification.types';
import { logger } from '../utils/logger';

// Mock data for notifications (Campus scenarios)
const mockNotifications: Notification[] = [
  {
    ID: '1',
    Type: 'Placement',
    Message: 'Google is visiting campus for placement Drive next week. All final year students are eligible.',
    Timestamp: '2024-12-20 10:00:00'
  },
  {
    ID: '2',
    Type: 'Event',
    Message: 'Annual Tech Fest 2024 will be held on December 25th. Registrations open now!',
    Timestamp: '2024-12-19 14:30:00'
  },
  {
    ID: '3',
    Type: 'Result',
    Message: 'Mid-semester exam results have been declared. Check your portal for details.',
    Timestamp: '2024-12-18 09:15:00'
  },
  {
    ID: '4',
    Type: 'Placement',
    Message: 'Microsoft pool placement drive scheduled for December 22nd. Prepare your resumes.',
    Timestamp: '2024-12-17 16:45:00'
  },
  {
    ID: '5',
    Type: 'Event',
    Message: 'Workshop on Artificial Intelligence and Machine Learning on Dec 21st.',
    Timestamp: '2024-12-16 11:20:00'
  },
  {
    ID: '6',
    Type: 'Result',
    Message: 'Internal assessment grades for Data Structures announced.',
    Timestamp: '2024-12-15 08:00:00'
  },
  {
    ID: '7',
    Type: 'Event',
    Message: 'Cultural Fest "Utsav 2024" registration deadline extended to Dec 23rd.',
    Timestamp: '2024-12-14 13:00:00'
  },
  {
    ID: '8',
    Type: 'Placement',
    Message: 'Amazon pool placement drive for 2025 batch. Eligibility criteria updated.',
    Timestamp: '2024-12-13 10:30:00'
  },
  {
    ID: '9',
    Type: 'Result',
    Message: 'Laboratory practical exam schedule for even semester released.',
    Timestamp: '2024-12-12 15:00:00'
  },
  {
    ID: '10',
    Type: 'Event',
    Message: 'Guest lecture by Dr. Smith on Cloud Computing - December 20th.',
    Timestamp: '2024-12-11 12:00:00'
  }
];

class ApiService {
  private useMockData: boolean = true;

  constructor() {
    logger.info('ApiService initialized with mock data mode');
  }

  /**
   * Fetch notifications - using local mock data
   */
  async fetchNotifications(): Promise<NotificationResponse> {
    logger.info('Fetching notifications from mock data');

    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 100));

    logger.info('Mock notifications fetched successfully', {
      notificationCount: mockNotifications.length
    });

    return {
      notifications: mockNotifications
    };
  }
}

export const apiService = new ApiService();
