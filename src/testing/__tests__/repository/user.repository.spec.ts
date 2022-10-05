import { TestData } from "../../test.data"
import { PrismaClient, Role, User } from "@prisma/client";
import { UserRepository } from "../../../repository/user.repository";

const prisma = new PrismaClient()
const userRepository = new UserRepository();
userRepository.prisma = prisma

describe('user repository tests', () => {
  it('get all to return objects correctly', () => {
    const valueToBeReturnedByPrisma: User & {
      roles: Role[]
    } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
    prisma.user.findMany = jest.fn().mockResolvedValue([valueToBeReturnedByPrisma]);
    expect(userRepository.findAll()).resolves.toEqual(expect.arrayContaining([TestData.TEST_USER]))
    expect(userRepository.prisma.user.findMany).toHaveBeenCalled()
  }
  )

  it('get by id to return object correctly',async () => {
    const valueToBeReturnedByPrisma: User & {
      roles: Role[]
    } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
    prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
    expect(userRepository.findById(TestData.ID)).resolves.toEqual(TestData.TEST_USER)
    expect(userRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('get by name to return object correctly',async () => {
    const valueToBeReturnedByPrisma: User & {
      roles: Role[]
    } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
    prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
    expect(userRepository.findById(TestData.NAME)).resolves.toEqual(TestData.TEST_USER)
    expect(userRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('exist by id to return correct boolean',async () => {
    prisma.user.count = jest.fn().mockResolvedValue(1);
    expect(userRepository.existsById(TestData.NAME)).resolves.toBe(true)
    expect(userRepository.prisma.user.count).toHaveBeenCalled()
  }
  )

  it('creates object correctly',async () => {
    const valueToBeReturnedByPrisma: User & {
      roles: Role[]
    } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
    prisma.user.create = jest.fn();
    prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
    expect(userRepository.create(TestData.TEST_USER_CREATE_DTO)).resolves.toEqual(TestData.TEST_USER)
    expect(userRepository.prisma.user.create).toHaveBeenCalled();
  }
  )

  it('updates object correctly',async () => {
    const valueToBeReturnedByPrisma: User & {
      roles: Role[]
    } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
    prisma.user.update = jest.fn();
    prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
    expect(userRepository.updateById(TestData.ID,TestData.TEST_USER_UPDATE_DTO)).resolves.toEqual(TestData.TEST_USER)
    expect(userRepository.prisma.user.update).toHaveBeenCalled();
  }
  )

  it('deletes object correctly', async() => {
    const valueToBeReturnedByPrisma: User & {
      roles: Role[]
    } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
    prisma.user.delete = jest.fn();
    prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
    expect(userRepository.deleteById(TestData.ID)).resolves.toEqual(TestData.TEST_USER)
  }
  )

}
)  
