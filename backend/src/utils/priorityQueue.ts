import { Notification, NotificationType } from '../types/notification.types';

/**
 * Min Heap implementation for efficient priority queue operations
 * Time Complexity: O(log n) for insert and extract
 * Space Complexity: O(n)
 */
export class PriorityQueue {
  private heap: Notification[];
  private readonly priorityMap: Map<NotificationType, number>;

  constructor() {
    this.heap = [];
    this.priorityMap = new Map([
      ['Placement', 3],
      ['Result', 2],
      ['Event', 1]
    ]);
  }

  /**
   * Compare two notifications based on priority logic
   * Returns true if n1 has LOWER priority than n2 (for min heap of top priorities)
   */
  private hasLowerPriority(n1: Notification, n2: Notification): boolean {
    const priority1 = this.priorityMap.get(n1.Type) || 0;
    const priority2 = this.priorityMap.get(n2.Type) || 0;

    // If different types, compare by priority
    if (priority1 !== priority2) {
      return priority1 < priority2;
    }

    // Same type, compare by timestamp (newer is higher priority)
    const time1 = new Date(n1.Timestamp).getTime();
    const time2 = new Date(n2.Timestamp).getTime();
    return time1 < time2;
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.hasLowerPriority(this.heap[index], this.heap[parentIndex])) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private heapifyDown(index: number): void {
    while (true) {
      let minIndex = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);

      if (
        leftChild < this.heap.length &&
        this.hasLowerPriority(this.heap[leftChild], this.heap[minIndex])
      ) {
        minIndex = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.hasLowerPriority(this.heap[rightChild], this.heap[minIndex])
      ) {
        minIndex = rightChild;
      }

      if (minIndex !== index) {
        this.swap(index, minIndex);
        index = minIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Insert notification into heap
   * Time Complexity: O(log n)
   */
  insert(notification: Notification): void {
    this.heap.push(notification);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Extract minimum priority notification
   * Time Complexity: O(log n)
   */
  extractMin(): Notification | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  /**
   * Peek at minimum without removing
   */
  peek(): Notification | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size(): number {
    return this.heap.length;
  }

  /**
   * Maintain only top N elements
   * When heap size exceeds N, remove lowest priority
   */
  maintainSize(maxSize: number): void {
    while (this.heap.length > maxSize) {
      this.extractMin();
    }
  }
}