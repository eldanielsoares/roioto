import { UseCaseError } from 'src/core/errors/use-case-error'

export class PackNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`Pack not found`)
  }
}
