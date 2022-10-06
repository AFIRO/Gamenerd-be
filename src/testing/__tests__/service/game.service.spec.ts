import { GameRepository } from "../../../repository/game.repository";
import { GameService } from "../../../service/game.service";
import { TestData } from "../../test.data";

const gameService = new GameService()
const mockRepository = new GameRepository()
gameService.gameRepository = mockRepository;

describe('game service tests',()=>{
  it('get all gets all games correctly', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([TestData.TEST_GAME]);
    const actual = await gameService.findAll();

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_GAME_OUTPUT_DTO])))
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id gets game correctly',async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    const actual = await gameService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('creates game correctly',async () => {
    mockRepository.create= jest.fn().mockResolvedValue(TestData.TEST_GAME);
    const actual = await gameService.create(TestData.TEST_GAME_CREATE_DTO);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.create).toHaveBeenCalledWith(TestData.TEST_GAME_CREATE_DTO)
  })

  it('updates game correctly',async () => {
    mockRepository.updateById= jest.fn().mockResolvedValue(TestData.TEST_GAME);
    const actual = await gameService.update(TestData.ID,TestData.TEST_GAME_UPDATE_DTO);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.updateById).toHaveBeenCalledWith(TestData.ID,TestData.TEST_GAME_UPDATE_DTO)
  })

  it('delete game correctly',async () => {
    mockRepository.existsById= jest.fn().mockResolvedValue(true)
    mockRepository.deleteById= jest.fn().mockResolvedValue(TestData.TEST_GAME);
    const actual = await gameService.delete(TestData.ID);

    expect(actual).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
    expect(mockRepository.deleteById).toHaveBeenCalledWith(TestData.ID)
    expect(mockRepository.existsById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get all throws error when no data', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([]);
    expect(gameService.findAll()).rejects.toThrow();
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id throws error when no data', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);
    expect(gameService.findById(TestData.ID)).rejects.toThrow();
    expect(mockRepository.findById).toBeCalledWith(TestData.ID)
  })

  it('update throws when id and dto id are not same', async () => {
    expect(gameService.update("WRONG", TestData.TEST_GAME_UPDATE_DTO)).rejects.toThrow();
    
  })

  it('delete by id throws error when no data', async () => {
    mockRepository.existsById = jest.fn().mockResolvedValue(null);
    expect(gameService.delete(TestData.ID)).rejects.toThrow();
    expect(mockRepository.existsById).toBeCalledWith(TestData.ID)
  })
  

})


