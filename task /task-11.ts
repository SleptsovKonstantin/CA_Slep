// 11 Создайте очередь, в которой буду реализованы операции на добавление элементов в конец очереди, удаление первого элемента и вычисление размера очереди с сложностью алгоритма О(1) .
class Queue<T> {
  private capacity: number;
  private size: number;
  private queue: (T | null)[];
  private front: number;
  private rear: number;

  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.queue = new Array(capacity).fill(null);
    this.front = 0;
    this.rear = -1;
  }

  enqueue(item: T) {
    if (this.size === this.capacity) {
      throw new Error("Queue is full");
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = item;
    this.size++;
  }

  dequeue(): T {
    if (this.size === 0) {
      throw new Error('Queue is empty');
    }
    const item = this.queue[this.front];
    this.queue[this.front] = null;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return item as T;
  }

  getSize(): number {
    return this.size;
  }
}
