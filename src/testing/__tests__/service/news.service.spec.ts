// import { GameRepository } from "../../../repository/game.repository";
// import { NewsRepository } from "../../../repository/news.repository";
// import { UserRepository } from "../../../repository/user.repository";
// import { NewsService } from "../../../service/news.service";
// import { TestData } from "../../test.data";

// const newsService = new NewsService()
// const mockNewsRepository = new NewsRepository()
// const mockgameRepository = new GameRepository();
// const mockuserRepository = new UserRepository();
// mockuserRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_USER)
// mockgameRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_GAME)
// mockuserRepository.existsById = jest.fn().mockResolvedValue(true)
// mockgameRepository.existsById = jest.fn().mockResolvedValue(true)
// newsService.newsRepository = mockNewsRepository;
// newsService.gameRepository = mockgameRepository
// newsService.userRepositoy = mockuserRepository


// describe('news service tests',()=>{
//   it('get all gets all news correctly', async () => {
//     mockNewsRepository.findAll = jest.fn().mockResolvedValue([TestData.TEST_NEWS]);
//     const actual = await newsService.findAll();

//     expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_NEWS_OUTPUT_DTO])))
//     expect(mockNewsRepository.findAll).toBeCalled()
//   })

//     it('get all by game gets all news correctly', async () => {
//       mockNewsRepository.findAllByGame = jest.fn().mockResolvedValue([TestData.TEST_NEWS]);
//       const actual = await newsService.findAllByGame(TestData.GAME_ID);
  
//       expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_NEWS_OUTPUT_DTO])))
//       expect(mockNewsRepository.findAllByGame).toBeCalledWith(TestData.GAME_ID)
//     })

//     it('get all by writer gets all news correctly', async () => {
//       mockNewsRepository.findAllByWriter = jest.fn().mockResolvedValue([TestData.TEST_NEWS]);
//       const actual = await newsService.findAllByWriter(TestData.GAME_ID);
  
//       expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_NEWS_OUTPUT_DTO])))
//       expect(mockNewsRepository.findAllByGame).toBeCalledWith(TestData.GAME_ID)
//     })


//   it('get by id gets news correctly',async () => {
//     mockNewsRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
//     const actual = await newsService.findById(TestData.ID);

//     expect(actual).toEqual(TestData.TEST_NEWS_OUTPUT_DTO)
//     expect(mockNewsRepository.findById).toHaveBeenCalledWith(TestData.ID)
//   })

//   it('creates news correctly',async () => {
//     mockNewsRepository.create= jest.fn().mockResolvedValue(TestData.TEST_NEWS);
//     const actual = await newsService.create(TestData.TEST_NEWS_CREATE_DTO);

//     expect(actual).toEqual(TestData.TEST_NEWS_OUTPUT_DTO)
//     expect(mockNewsRepository.create).toHaveBeenCalledWith(TestData.TEST_NEWS_CREATE_DTO)
//   })

//   it('updates news correctly',async () => {
//     mockNewsRepository.updateById= jest.fn().mockResolvedValue(TestData.TEST_NEWS);
//     const actual = await newsService.update(TestData.ID,TestData.TEST_NEWS_UPDATE_DTO);

//     expect(actual).toEqual(TestData.TEST_NEWS_OUTPUT_DTO)
//     expect(mockNewsRepository.updateById).toHaveBeenCalledWith(TestData.ID,TestData.TEST_NEWS_UPDATE_DTO)
//   })

//   it('delete news correctly',async () => {
//     mockNewsRepository.existsById= jest.fn().mockResolvedValue(true)
//     mockNewsRepository.deleteById= jest.fn().mockResolvedValue(TestData.TEST_NEWS);
//     const actual = await newsService.delete(TestData.ID);

//     expect(actual).toEqual(TestData.TEST_NEWS_OUTPUT_DTO)
//     expect(mockNewsRepository.deleteById).toHaveBeenCalledWith(TestData.ID)
//   })

//   it('get all throws error when no data', async () => {
//     mockNewsRepository.findAll = jest.fn().mockResolvedValue([]);
//     expect(newsService.findAll()).rejects.toThrow();
//     expect(mockNewsRepository.findAll).toBeCalled()
//   })

//   it('get all by game throws error when no data', async () => {
//     mockNewsRepository.findAllByGame = jest.fn().mockResolvedValue([]);
//     expect(newsService.findAllByGame(TestData.GAME_ID)).rejects.toThrow();
//     expect(mockNewsRepository.findAllByGame).toHaveBeenCalledWith(TestData.GAME_ID)
//   })

//   it('get all by writer throws error when no data', async () => {
//     mockNewsRepository.findAllByWriter = jest.fn().mockResolvedValue([]);
//     expect(newsService.findAllByWriter(TestData.WRITER_ID)).rejects.toThrow();
//     expect(mockNewsRepository.findAllByWriter).toHaveBeenCalledWith(TestData.WRITER_ID)
//   })

//   it('get by id throws error when no data', async () => {
//     mockNewsRepository.findById = jest.fn().mockResolvedValue(null);
//     expect(newsService.findById(TestData.ID)).rejects.toThrow();
//     expect(mockNewsRepository.findById).toBeCalledWith(TestData.ID)
//   })

//   it('update throws when id and dto id are not same', async () => {
//     expect(newsService.update("WRONG", TestData.TEST_NEWS_UPDATE_DTO)).rejects.toThrow();
    
//   })

//   it('delete by id throws error when no data', async () => {
//     mockNewsRepository.existsById = jest.fn().mockResolvedValue(null);
//     expect(newsService.delete(TestData.ID)).rejects.toThrow();
//     expect(mockNewsRepository.existsById).toBeCalledWith(TestData.ID)
//   })
// })