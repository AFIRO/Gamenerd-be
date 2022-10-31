import { UserRepository } from "../../../repository/user.repository";
import { AuthenticationService } from "../../../service/authentification.service";
import { UserService } from "../../../service/user.service";
import { PasswordHasher } from "../../../util/password.hasher";
import { TestData } from "../../test.data";

const userService = new UserService()
const mockRepository = new UserRepository()
const mockPasswordHasher = new PasswordHasher()
const mockService = new AuthenticationService()
userService.userRepository = mockRepository;
userService.passwordHasher = mockPasswordHasher;
userService.authentificationService = mockService

describe('user service tests', () => {
  it('get all gets all user correctly', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([TestData.TEST_USER]);
    const actual = await userService.findAll();

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_USER_OUTPUT_DTO])))
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id gets user correctly', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER_SHORT_DTO)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by id with roles gets user correctly', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.findByIdWithRoles(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('registers user correctly', async () => {
    mockRepository.create = jest.fn().mockResolvedValue(TestData.TEST_USER_NO_ADMIN);
    mockPasswordHasher.hashPassword = jest.fn().mockResolvedValue(TestData.PASSWORD)
    mockService.makeLoginData = jest.fn().mockReturnValue(TestData.TEST_USER_TOKEN_DTO_NO_ADMIN)
    const actual = await userService.register(TestData.TEST_USER_REGISTER_DTO);

    expect(actual).toEqual(TestData.TEST_USER_TOKEN_DTO_NO_ADMIN)
    expect(mockRepository.create).toHaveBeenCalledWith(TestData.TEST_USER_CREATE_DTO_NO_ADMIN)
    expect(mockPasswordHasher.hashPassword).toBeCalledWith(TestData.PASSWORD);
    expect(mockService.makeLoginData).toBeCalledWith(TestData.TEST_USER_NO_ADMIN)
  })


  it('creates user correctly', async () => {
    mockRepository.create = jest.fn().mockResolvedValue(TestData.TEST_USER);
    mockPasswordHasher.hashPassword = jest.fn().mockResolvedValue(TestData.PASSWORD)
    const actual = await userService.create(TestData.TEST_USER_CREATE_DTO);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.create).toHaveBeenCalledWith(TestData.TEST_USER_CREATE_DTO)
    expect(mockPasswordHasher.hashPassword).toBeCalledWith(TestData.PASSWORD);
  })

  it('updates user correctly', async () => {
    mockRepository.updateById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.update(TestData.ID, TestData.TEST_USER_UPDATE_DTO);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.updateById).toHaveBeenCalledWith(TestData.ID, TestData.TEST_USER_UPDATE_DTO)
  })

  it('updates password correctly', async () => {
    mockRepository.updatePasswordById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    mockPasswordHasher.hashPassword = jest.fn().mockResolvedValue(TestData.PASSWORD)
    const actual = await userService.updatePassword(TestData.ID, TestData.TEST_USER_UPDATE_PASSWORD_DTO);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.updatePasswordById).toHaveBeenCalledWith(TestData.ID, TestData.TEST_USER_UPDATE_PASSWORD_DTO)
    expect(mockPasswordHasher.hashPassword).toBeCalledWith(TestData.PASSWORD);
  })

  it('delete user correctly', async () => {
    mockRepository.existsById = jest.fn().mockResolvedValue(true)
    mockRepository.deleteById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.delete(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.deleteById).toHaveBeenCalledWith(TestData.ID)
    expect(mockRepository.existsById).toBeCalledWith(TestData.ID);
  })

  it('get all throws error when no data', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([]);
    expect(userService.findAll()).rejects.toThrow();
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id throws error when no data', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);
    expect(userService.findById(TestData.ID)).rejects.toThrow();
    expect(mockRepository.findById).toBeCalledWith(TestData.ID)
  })

  it('get by id with roles throws error when no data', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);
    expect(userService.findByIdWithRoles(TestData.ID)).rejects.toThrow();
    expect(mockRepository.findById).toBeCalledWith(TestData.ID)
  })

  it('update throws when id and dto id are not same', async () => {
    expect(userService.update("WRONG", TestData.TEST_USER_UPDATE_DTO)).rejects.toThrow();

  })

  it('delete by id throws error when no data', async () => {
    mockRepository.existsById = jest.fn().mockResolvedValue(null);
    expect(userService.delete(TestData.ID)).rejects.toThrow();
    expect(mockRepository.existsById).toBeCalledWith(TestData.ID)
  })
})