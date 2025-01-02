import { CardProps } from '../../enterprise/entities/card'

export abstract class ProcessFile {
  abstract processFile(file: Buffer): Promise<CardProps[]>
}
