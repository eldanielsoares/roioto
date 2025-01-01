import { InMemoryPackRepository } from 'test/repositories/in-memory-pack-repository'
import { GeneratePreferenceIdUseCase } from './generate-preference-id'
import { InMemoryPaymentRepository } from 'test/repositories/in-memory-payment-repository'
import { makePack } from 'test/factories/make-pack'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

let inMemoryPackRepository: InMemoryPackRepository

let inMemoryPaymentRepository: InMemoryPaymentRepository

let sut: GeneratePreferenceIdUseCase

describe('Generate Preference Id Use Case', () => {
  beforeEach(() => {
    inMemoryPackRepository = new InMemoryPackRepository()
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    sut = new GeneratePreferenceIdUseCase(
      inMemoryPaymentRepository,
      inMemoryPackRepository,
    )
  })

  it('should generate Preference Id ', async () => {
    const packId = new UniqueEntityID()
    const packData = makePack({}, packId)

    inMemoryPackRepository.items.push(packData)

    const result = await sut.execute(packId.toString())

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('preferenceId')
  })

  it('should generate Preference Id ', async () => {
    vitest
      .spyOn(inMemoryPaymentRepository, 'createPreference')
      .mockResolvedValueOnce(undefined)

    const packId = new UniqueEntityID()
    const packData = makePack({}, packId)

    inMemoryPackRepository.items.push(packData)

    const result = await sut.execute(packId.toString())

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})
