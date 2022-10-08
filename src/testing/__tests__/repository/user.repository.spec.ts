// import { TestData } from "../../test.data"
// import { PrismaClient, Role, User } from "@prisma/client";
// import { UserRepository } from "../../../repository/user.repository";

// const prisma = new PrismaClient()
// const userRepository = new UserRepository();
// userRepository.prisma = prisma

// describe('user repository tests', () => {
//   it('get all to return objects correctly', async () => {
//     const valueToBeReturnedByPrisma: User & {
//       roles: Role[]
//     } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
//     prisma.user.findMany = jest.fn().mockResolvedValue([valueToBeReturnedByPrisma]);
//     expect(await userRepository.findAll()).toEqual(expect.arrayContaining([TestData.TEST_USER]))
//     expect(userRepository.prisma.user.findMany).toHaveBeenCalled()
//   }
//   )

//   it('get by id to return object correctly',async () => {
//     const valueToBeReturnedByPrisma: User & {
//       roles: Role[]
//     } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
//     prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
//     expect(await userRepository.findById(TestData.ID)).toEqual(TestData.TEST_USER)
//     expect(userRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalled()
//   }
//   )

//   it('get by name to return object correctly',async () => {
//     const valueToBeReturnedByPrisma: User & {
//       roles: Role[]
//     } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
//     prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
//     expect(await userRepository.findByName(TestData.NAME)).toEqual(TestData.TEST_USER)
//     expect(userRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalled()
//   }
//   )

//   it('exist by id to return correct boolean',async () => {
//     prisma.user.count = jest.fn().mockResolvedValue(1);
//     expect(await userRepository.existsById(TestData.NAME)).toBe(true)
//     expect(userRepository.prisma.user.count).toHaveBeenCalled()
//   }
//   )

//   it('creates object correctly',async () => {
//     const valueToBeReturnedByPrisma: User & {
//       roles: Role[]
//     } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
//     prisma.user.create = jest.fn();
//     prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
//     expect(await userRepository.create(TestData.TEST_USER_CREATE_DTO)).toEqual(TestData.TEST_USER)
//     expect(userRepository.prisma.user.create).toHaveBeenCalled();
//     expect(userRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalled()
//   }
//   )

//   it('updates object correctly',async () => {
//     const valueToBeReturnedByPrisma: User & {
//       roles: Role[]
//     } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
//     prisma.user.update = jest.fn();
//     prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
//     expect(await userRepository.updateById(TestData.ID,TestData.TEST_USER_UPDATE_DTO)).toEqual(TestData.TEST_USER)
//     expect(userRepository.prisma.user.update).toHaveBeenCalled();
//     expect(userRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalled()
//   }
//   )

//   it('deletes object correctly', async() => {
//     const valueToBeReturnedByPrisma: User & {
//       roles: Role[]
//     } = { id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [{ name: "ADMIN" }] }
//     prisma.user.delete = jest.fn();
//     prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(valueToBeReturnedByPrisma);
//     expect(await userRepository.deleteById(TestData.ID)).toEqual(TestData.TEST_USER)
//     expect(userRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalled()
//     expect(userRepository.prisma.user.delete).toHaveBeenCalled()
//   }
//   )
// }
// )  
