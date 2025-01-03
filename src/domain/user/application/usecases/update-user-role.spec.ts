import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UpdateUserRoleUseCase } from './update-user-role'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUsersRepository

let sut: UpdateUserRoleUseCase

describe('Update User Role Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new UpdateUserRoleUseCase(inMemoryUserRepository)
  })

  it('should update user role', async () => {
    const userId = new UniqueEntityID()

    const user = makeUser(
      {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'pass-hashed',
        role: 'USER',
      },
      userId,
    )

    inMemoryUserRepository.items.push(user)

    const role = 'ADMIN'

    const result = await sut.execute(userId.toString(), role)

    expect(result.isRight()).toBe(true)
  })

  it('should return error if not found user', async () => {
    const userId = new UniqueEntityID().toString()
    const role = 'ADMIN'

    const result = await sut.execute(userId, role)

    expect(result.isLeft()).toBe(true)
  })
})
