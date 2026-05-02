/**
 * Local storage utility for tracking viewed notifications
 * Maintains state across page refreshes
 */

const STORAGE_KEY = 'campus_notifications_viewed';
const NEW_NOTIFICATIONS_KEY = 'campus_notifications_new';

export const storageUtil = {
  /**
   * Get viewed notification IDs
   */
  getViewedIds(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  },

  /**
   * Mark notification as viewed
   */
  markAsViewed(id: string): void {
    if (typeof window === 'undefined') return;
    
    const viewedIds = this.getViewedIds();
    viewedIds.add(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...viewedIds]));
  },

  /**
   * Mark multiple notifications as viewed
   */
  markMultipleAsViewed(ids: string[]): void {
    if (typeof window === 'undefined') return;
    
    const viewedIds = this.getViewedIds();
    ids.forEach(id => viewedIds.add(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...viewedIds]));
  },

  /**
   * Check if notification is viewed
   */
  isViewed(id: string): boolean {
    return this.getViewedIds().has(id);
  },

  /**
   * Get new notification IDs
   */
  getNewIds(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    
    const stored = localStorage.getItem(NEW_NOTIFICATIONS_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  },

  /**
   * Mark notification as new
   */
  markAsNew(id: string): void {
    if (typeof window === 'undefined') return;
    
    const newIds = this.getNewIds();
    newIds.add(id);
    localStorage.setItem(NEW_NOTIFICATIONS_KEY, JSON.stringify([...newIds]));
  },

  /**
   * Remove from new notifications
   */
  removeFromNew(id: string): void {
    if (typeof window === 'undefined') return;
    
    const newIds = this.getNewIds();
    newIds.delete(id);
    localStorage.setItem(NEW_NOTIFICATIONS_KEY, JSON.stringify([...newIds]));
  },

  /**
   * Clear all storage
   */
  clearAll(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NEW_NOTIFICATIONS_KEY);
  }
};