import { UserRepository } from "../../../repository/user.repository";
import { AuthenticationService } from "../../../service/authentification.service";
import { UserService } from "../../../service/user.service";
import { TestData } from "../../test.data";

const userService = new UserService()
const mockRepository = new UserRepository()
userService.userRepository = mockRepository;

describe('user service tests',()=>{
  it('get all gets all user correctly', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([TestData.TEST_USER]);
    const actual = await userService.findAll();

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_USER_OUTPUT_DTO])))
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id gets user correctly',async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER_SHORT_DTO)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by id with roles gets user correctly',async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })


  it('creates user correctly',async () => {
    mockRepository.create= jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.create(TestData.TEST_USER_CREATE_DTO);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.create).toHaveBeenCalledWith(TestData.TEST_USER_CREATE_DTO)
  })

  it('updates user correctly',async () => {
    mockRepository.updateById= jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.update(TestData.ID,TestData.TEST_USER_UPDATE_DTO);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.updateById).toHaveBeenCalledWith(TestData.ID,TestData.TEST_USER_UPDATE_DTO)
  })

  it('delete user correctly',async () => {
    mockRepository.existsById= jest.fn().mockResolvedValue(true)
    mockRepository.deleteById= jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.delete(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER_OUTPUT_DTO)
    expect(mockRepository.deleteById).toHaveBeenCalledWith(TestData.ID)
  })

  
  

})