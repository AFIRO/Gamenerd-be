import { GameRepository } from "../../../repository/game.repository";
import { ReviewRepository } from "../../../repository/review.repository";
import { UserRepository } from "../../../repository/user.repository";
import { ReviewService } from "../../../service/review.service";
import { TestData } from "../../test.data";

const newsService = new ReviewService()
const mockReviewRepository = new ReviewRepository()
const mockgameRepository = new GameRepository();
const mockuserRepository = new UserRepository();
mockuserRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_USER)
mockgameRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_GAME)
mockuserRepository.existsById = jest.fn().mockResolvedValue(true)
mockgameRepository.existsById = jest.fn().mockResolvedValue(true)
newsService.reviewRepository = mockReviewRepository;
newsService.gameRepository = mockgameRepository
newsService.userRepositoy = mockuserRepository


describe('review service tests',()=>{
  it('get all gets all review correctly', async () => {
    mockReviewRepository.findAll = jest.fn().mockResolvedValue([TestData.TEST_REVIEW]);
    const actual = await newsService.findAll();

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_REVIEW_OUTPUT_DTO])))
    expect(mockReviewRepository.findAll).toBeCalled()
  })

    it('get all by game gets all review correctly', async () => {
      mockReviewRepository.findAllByGame = jest.fn().mockResolvedValue([TestData.TEST_REVIEW]);
      const actual = await newsService.findAllByGame(TestData.GAME_ID);
  
      expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_REVIEW_OUTPUT_DTO])))
      expect(mockReviewRepository.findAllByGame).toBeCalledWith(TestData.GAME_ID)
    })

    it('get all by writer gets all review correctly', async () => {
      mockReviewRepository.findAllByWriter = jest.fn().mockResolvedValue([TestData.TEST_REVIEW]);
      const actual = await newsService.findAllByWriter(TestData.GAME_ID);
  
      expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_REVIEW_OUTPUT_DTO])))
      expect(mockReviewRepository.findAllByGame).toBeCalledWith(TestData.GAME_ID)
    })


  it('get by id gets review correctly',async () => {
    mockReviewRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    const actual = await newsService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
    expect(mockReviewRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('creates review correctly',async () => {
    mockReviewRepository.create= jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    const actual = await newsService.create(TestData.TEST_REVIEW_CREATE_DTO);

    expect(actual).toEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
    expect(mockReviewRepository.create).toHaveBeenCalledWith(TestData.TEST_REVIEW_CREATE_DTO)
  })

  it('updates review correctly',async () => {
    mockReviewRepository.updateById= jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    const actual = await newsService.update(TestData.ID,TestData.TEST_REVIEW_UPDATE_DTO);

    expect(actual).toEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
    expect(mockReviewRepository.updateById).toHaveBeenCalledWith(TestData.ID,TestData.TEST_REVIEW_UPDATE_DTO)
  })

  it('delete review correctly',async () => {
    mockReviewRepository.existsById= jest.fn().mockResolvedValue(true)
    mockReviewRepository.deleteById= jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    const actual = await newsService.delete(TestData.ID);

    expect(actual).toEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
    expect(mockReviewRepository.deleteById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get all throws error when no data', async () => {
    mockReviewRepository.findAll = jest.fn().mockResolvedValue([]);
    expect(newsService.findAll()).rejects.toThrow();
    expect(mockReviewRepository.findAll).toBeCalled()
  })

  it('get all by game throws error when no data', async () => {
    mockReviewRepository.findAllByGame = jest.fn().mockResolvedValue([]);
    expect(newsService.findAllByGame(TestData.GAME_ID)).rejects.toThrow();
    expect(mockReviewRepository.findAllByGame).toHaveBeenCalledWith(TestData.GAME_ID)
  })

  it('get all by writer throws error when no data', async () => {
    mockReviewRepository.findAllByWriter = jest.fn().mockResolvedValue([]);
    expect(newsService.findAllByWriter(TestData.WRITER_ID)).rejects.toThrow();
    expect(mockReviewRepository.findAllByWriter).toHaveBeenCalledWith(TestData.WRITER_ID)
  })

  it('get by id throws error when no data', async () => {
    mockReviewRepository.findById = jest.fn().mockResolvedValue(null);
    expect(newsService.findById(TestData.ID)).rejects.toThrow();
    expect(mockReviewRepository.findById).toBeCalledWith(TestData.ID)
  })

  it('update throws when id and dto id are not same', async () => {
    expect(newsService.update("WRONG", TestData.TEST_REVIEW_UPDATE_DTO)).rejects.toThrow();
    
  })

  it('delete by id throws error when no data', async () => {
    mockReviewRepository.existsById = jest.fn().mockResolvedValue(null);
    expect(newsService.delete(TestData.ID)).rejects.toThrow();
    expect(mockReviewRepository.existsById).toBeCalledWith(TestData.ID)
  })
})