// import { UserRepository } from "../../../repository/user.repository";
// import { AuthenticationService } from "../../../service/authentification.service";
// import { JwtHelper } from "../../../util/jwt.utility";
// import { PasswordHasher } from "../../../util/password.hasher";
// import { TestData } from "../../test.data";

// const mockuserRepository = new UserRepository()
// const mockPasswordHasher = new PasswordHasher()
// const mockJwtHelper = new JwtHelper()
// const mockContext = {headers: {authorization: TestData.AUTH_HEADER}}
// const authenticationService = new AuthenticationService();

// authenticationService.passwordHasher = mockPasswordHasher
// authenticationService.userRepository = mockuserRepository
// authenticationService.JwtHelper = mockJwtHelper

// describe('authentification service tests',()=>{
//   it('login performs operations correctly', async () => {
//     mockuserRepository.findByName = jest.fn().mockResolvedValue(TestData.TEST_USER);
//     mockPasswordHasher.verifyPassword = jest.fn().mockResolvedValue(true)
//     authenticationService.makeLoginData = jest.fn().mockReturnValue(TestData.TEST_USER_TOKEN_DTO)
//     const actual = await authenticationService.login(TestData.TEST_LOGIN_DATA_DTO);

//     expect(actual).toEqual(TestData.TEST_USER_TOKEN_DTO)
//     expect(mockuserRepository.findByName).toHaveBeenCalledWith(TestData.NAME)
//     expect(mockPasswordHasher.verifyPassword).toHaveBeenCalledWith(TestData.PASSWORD,TestData.PASSWORD)
//     expect(authenticationService.makeLoginData).toHaveBeenCalledWith(TestData.TEST_USER)
//   })

//   it('login throws if user not found', async () => {
//     mockuserRepository.findByName = jest.fn().mockResolvedValue(false);
//     expect(authenticationService.login).rejects.toThrow();
//   })

//   it('login throws if wrong password', async () => {
//     mockuserRepository.findByName = jest.fn().mockResolvedValue(TestData.TEST_USER);
//     mockPasswordHasher.verifyPassword = jest.fn().mockResolvedValue(false)
//     expect(authenticationService.login).rejects.toThrow();
//   })
// })