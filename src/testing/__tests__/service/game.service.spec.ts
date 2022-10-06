import { GameRepository } from "../../../repository/game.repository";
import { GameService } from "../../../service/game.service";
import { mockDeep } from 'jest-mock-extended';
import { TestData } from "../../test.data";

const gameService = new GameService()
const mockRepository = mockDeep<GameRepository>()
gameService.gameRepository = mockRepository;

describe('game service tests',()=>{
  it('get all gets all games correctly', () => {
    mockRepository.findAll.mockResolvedValue([TestData.TEST_GAME]);
    const actual = gameService.findAll();

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id gets game correctly', () => {
    mockRepository.findById.calledWith(TestData.ID).mockResolvedValue(TestData.TEST_GAME);
    const actual = gameService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('creates game correctly', () => {
    mockRepository.create.calledWith(TestData.TEST_GAME_CREATE_DTO).mockResolvedValue(TestData.TEST_GAME);
    const actual = gameService.create(TestData.TEST_GAME_CREATE_DTO);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.create).toHaveBeenCalledWith(TestData.ID)
  })

  it('updates game correctly', () => {
    mockRepository.updateById.calledWith(TestData.ID,TestData.TEST_GAME_UPDATE_DTO).mockResolvedValue(TestData.TEST_GAME);
    const actual = gameService.update(TestData.ID,TestData.TEST_GAME_UPDATE_DTO);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.updateById).toHaveBeenCalledWith(TestData.ID,TestData.TEST_GAME_UPDATE_DTO)
  })

  it('delete game correctly', () => {
    mockRepository.deleteById.calledWith(TestData.ID).mockResolvedValue(TestData.TEST_GAME);
    const actual = gameService.delete(TestData.ID);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.deleteById).toHaveBeenCalledWith(TestData.ID)
  })

  
  

})


