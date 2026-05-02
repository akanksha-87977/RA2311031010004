import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { notificationService } from './services/notificationService';
import { logger } from './utils/logger';

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Get priority notifications
 */
app.get('/api/priority', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await notificationService.getPriorityNotifications({ limit });
    res.json(result);
  } catch (error: any) {
    logger.error('API Error: Priority', { error: error.message });
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all notifications
 */
app.get('/api/notifications', async (req: Request, res: Response) => {
  try {
    const result = await notificationService.getAllNotifications();
    res.json(result);
  } catch (error: any) {
    logger.error('API Error: Notifications', { error: error.message });
    res.status(500).json({ error: error.message });
  }
});

/**
 * Default route
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Campus Notification API',
    endpoints: [
      '/health',
      '/api/notifications',
      '/api/priority?limit=10'
    ]
  });
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default server;
