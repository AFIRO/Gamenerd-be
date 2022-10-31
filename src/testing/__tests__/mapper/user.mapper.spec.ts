import { UserMapper } from "../../../mapper/user.mapper";
import { TestData } from "../../test.data";

describe('user mapper tests', () => {
  it('maps entity to output dto correctly', () => {
    const actual = UserMapper.toOutputDto(TestData.TEST_USER);

    expect(actual.id).toBe(TestData.ID)
    expect(actual.name).toBe(TestData.NAME)
    expect(actual.roles).toBe(TestData.ROLES)
  })

  it('maps entity to shortened output dto correctly', () => {
    const actual = UserMapper.toOutputDtoShort(TestData.TEST_USER);

    expect(actual.id).toBe(TestData.ID)
    expect(actual.name).toBe(TestData.NAME)
  })

  it('maps entity to output dto with token correctly', () => {
    const actual = UserMapper.toOutputDtoToken(TestData.TEST_USER, TestData.TOKEN);

    expect(actual.user.id).toBe(TestData.ID)
    expect(actual.user.name).toBe(TestData.NAME)
    expect(actual.token).toBe(TestData.TOKEN)
  })
})