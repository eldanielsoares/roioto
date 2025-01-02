export abstract class Queue {
  abstract add<T>(data: T[]): Promise<void>
}
