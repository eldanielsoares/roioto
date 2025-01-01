import { UseCaseError } from '@/core/errors/use-case-error'

export class SomethingGoesWrongError extends Error implements UseCaseError {
  constructor() {
    super(`Something went wrong`)
  }
}
