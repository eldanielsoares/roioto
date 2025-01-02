import { Card } from '../../enterprise/entities/card'

export abstract class ProcessFile {
  abstract processFile(filePath: any): Promise<Card[]>
}
