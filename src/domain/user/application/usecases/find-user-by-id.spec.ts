import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FindUserByIdUseCase } from './find-user-by-id'
import { UserNotFoundError } from './errors/user-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { User } from '../../enterprise/entities/user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: FindUserByIdUseCase

describe('Find User By Id', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new FindUserByIdUseCase(inMemoryUsersRepository)
  })

  it('should return error if user is not found', async () => {
    const result = await sut.execute('invalid_id')
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should user matched by id', async () => {
    const userId = new UniqueEntityID()
    const item = makeUser(
      {
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: await fakeHasher.hash('password'),
      },
      userId,
    )
    inMemoryUsersRepository.items.push(item)

    const result = await sut.execute(userId.toString())

    const { user } = result.value as { user: User }

    expect(result.isRight()).toBe(true)
    expect(user).toEqual(inMemoryUsersRepository.items[0])
  })
})
