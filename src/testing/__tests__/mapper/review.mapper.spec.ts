import { ReviewMapper } from "../../../mapper/review.mapper";
import { TestData } from "../../test.data";

describe('review mapper tests', () => {
  it('maps entity to output dto correctly', () => {
    const actual = ReviewMapper.toOutputDto(TestData.TEST_REVIEW, TestData.TEST_USER_SHORT_DTO, TestData.TEST_GAME_OUTPUT_DTO);

    expect(actual.id).toBe(TestData.ID)
    expect(actual.content).toBe(TestData.CONTENT)
    expect(actual.score).toBe(TestData.SCORE)
    expect(actual.game.id).toBe(TestData.ID)
    expect(actual.game.name).toBe(TestData.NAME)
    expect(actual.game.boxart).toBe(TestData.BOXART)
    expect(actual.writer.id).toBe(TestData.ID)
    expect(actual.writer.name).toBe(TestData.NAME)
  })
})