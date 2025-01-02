import { FakeEncryption } from 'test/cryptography/fake-encryption'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { AuthenticateUserGoogleUsecase } from './authenticate-user-google'
import { User } from '../../enterprise/entities/user'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncryption: FakeEncryption

let sut: AuthenticateUserGoogleUsecase

describe('Authenticate User Google Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncryption = new FakeEncryption()
    sut = new AuthenticateUserGoogleUsecase(
      inMemoryUsersRepository,
      fakeEncryption,
      fakeHasher,
    )
  })

  it('should be able to authenticate using google', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: await fakeHasher.hash(''),
      provider: 'google',
    })

    inMemoryUsersRepository.items.push(user)

    const mockUser = User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '',
      provider: 'google',
    })

    console.log(mockUser)

    const result = await sut.execute(mockUser)

    const { accessToken } = result.value as { accessToken: string }

    expect(result.isRight()).toBe(true)
    expect(accessToken).toBeTruthy()
  })

  it('should return error if user have no provider', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: await fakeHasher.hash(''),
    })

    inMemoryUsersRepository.items.push(user)

    const mockUser = User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '',
    })

    const result = await sut.execute(mockUser)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
  it('should return error if user provider is not google', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: await fakeHasher.hash(''),
      provider: 'google',
    })

    inMemoryUsersRepository.items.push(user)

    const mockUser = User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '',
      provider: 'facebook',
    })

    const result = await sut.execute(mockUser)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })

  it('should create a user if user dont exists', async () => {
    const mockUser = User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '',
      provider: 'google',
    })

    const result = await sut.execute(mockUser)

    expect(result.isRight()).toBe(true)
  })
})
