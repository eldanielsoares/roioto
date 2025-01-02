export abstract class QueueRepository {
  abstract add<T>(queueName: string, data: T[]): Promise<void>
}
