import { FakeEncryption } from 'test/cryptography/fake-encryption'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { AuthenticateUserUseCase } from './authenticate-user'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncryption: FakeEncryption

let sut: AuthenticateUserUseCase

describe('Autenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncryption = new FakeEncryption()
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncryption,
    )
  })

  it('should return error if user is not found', async () => {
    const result = await sut.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should return error if password is wrong', async () => {
    const user = makeUser({
      email: 'john.doe@example.com',
      password: await fakeHasher.hash('password'),
      role: 'USER',
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should authenticate user', async () => {
    const user = makeUser({
      email: 'john.doe@example.com',
      password: await fakeHasher.hash('password123'),
      role: 'USER',
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const { accessToken } = result.value as { accessToken: string }

    expect(result.isRight()).toBe(true)
    expect(accessToken).toBeTruthy()
  })
})
