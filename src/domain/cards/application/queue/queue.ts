export abstract class QueueRepository {
  abstract add<T>(
    queueName: string,
    queueConsumerName: string,
    data: T[],
  ): Promise<void>
}
