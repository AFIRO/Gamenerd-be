
import { GameMapper } from "../../../mapper/game.mapper";
import { TestData } from "../../test.data"

describe('game mapper tests',()=>{
  it('maps entity to output dto correctly', () => {
    const actual = GameMapper.toOutputDto(TestData.TEST_GAME);

    expect(actual.id).toBe(TestData.ID)
    expect(actual.name).toBe(TestData.NAME)
    expect(actual.boxart).toBe(TestData.BOXART)
  })  
})