import { FakeEncryption } from 'test/cryptography/fake-encryption'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { User } from '../../enterprise/entities/user'
import { makeUser } from 'test/factories/make-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncryption: FakeEncryption

let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncryption = new FakeEncryption()
    sut = new CreateUserUseCase(
      inMemoryUsersRepository,
      fakeEncryption,
      fakeHasher,
    )
  })

  it('should create a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(result.isRight()).toBe(true)

    const { user } = result.value as { user: User; accessToken: string }

    expect(user).toEqual(inMemoryUsersRepository.items[0])
  })

  it('should hash passwords', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const hashedPassword = await fakeHasher.hash('password123')
    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should return a access token', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const { accessToken } = result.value as { user: User; accessToken: string }

    expect(result.isRight()).toBe(true)
    expect(accessToken).toBeTruthy()
  })

  it('should check if user already exists', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
