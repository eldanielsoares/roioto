import { FakeEncryption } from 'test/cryptography/fake-encryption'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { AuthenticateUserUseCase } from './authenticate-user'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { DeleteUserUseCase } from './delete-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserNotFoundError } from './errors/user-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher

let sut: DeleteUserUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it('should return error if user is not found', async () => {
    const result = await sut.execute(new UniqueEntityID().toString())

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should be able to delete user', async () => {
    const userId = new UniqueEntityID()
    const user = makeUser(
      {
        email: 'john.doe@example.com',
        password: await fakeHasher.hash('password123'),
      },
      userId,
    )

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute(userId.toString())

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeUndefined()
  })
})
