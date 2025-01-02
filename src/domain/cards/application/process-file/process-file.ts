export abstract class ProcessFile {
  abstract processFile<T>(file: Buffer): Promise<T[]>
}
