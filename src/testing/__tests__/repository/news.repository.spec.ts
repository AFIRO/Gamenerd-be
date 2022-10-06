import { TestData } from "../../test.data"
import { PrismaClient } from "@prisma/client";
import { NewsRepository } from "../../../repository/news.repository";

const prisma = new PrismaClient()
const newsRepository = new NewsRepository();
newsRepository.prisma = prisma

describe('user repository tests',()=>{
  it('get all to return objects correctly', async () => {
  prisma.news.findMany = jest.fn().mockResolvedValue([TestData.TEST_NEWS])
  expect(await newsRepository.findAll()).toEqual(expect.arrayContaining([TestData.TEST_NEWS]))
  expect(newsRepository.prisma.news.findMany).toHaveBeenCalled()
  }
  )

  it('get all by game to return objects correctly', async () => {
    prisma.news.findMany = jest.fn().mockResolvedValue([TestData.TEST_NEWS])
    expect(await newsRepository.findAllByGame(TestData.GAME_ID)).toEqual(expect.arrayContaining([TestData.TEST_NEWS]))
    expect(newsRepository.prisma.news.findMany).toHaveBeenCalled()
    }
    )

    it('get all by writer to return objects correctly',async () => {
      prisma.news.findMany = jest.fn().mockResolvedValue([TestData.TEST_NEWS])
      expect(await newsRepository.findAllByWriter(TestData.WRITER_ID)).toEqual(expect.arrayContaining([TestData.TEST_NEWS]))
      expect(newsRepository.prisma.news.findMany).toHaveBeenCalled()
      }
      )
  
  it('get by id to return object correctly',async () => {
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(await newsRepository.findById(TestData.ID)).toEqual(TestData.TEST_NEWS)
    expect(newsRepository.prisma.news.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('exist by id to return correct boolean',async () => {
    prisma.news.count = jest.fn().mockResolvedValue(1);
    expect(await newsRepository.existsById(TestData.NAME)).toBe(true)
    expect(newsRepository.prisma.news.count).toHaveBeenCalled()
  }
  )

  it('creates object correctly',async () => {
    prisma.news.create = jest.fn();
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(await newsRepository.create(TestData.TEST_NEWS_CREATE_DTO)).toEqual(TestData.TEST_NEWS)
    expect(newsRepository.prisma.news.create).toHaveBeenCalled();
    expect(newsRepository.prisma.news.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('updates object correctly',async () => {
    prisma.news.update = jest.fn();
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(await newsRepository.updateById(TestData.ID,TestData.TEST_NEWS_UPDATE_DTO)).toEqual(TestData.TEST_NEWS)
    expect(newsRepository.prisma.news.update).toHaveBeenCalled();
    expect(newsRepository.prisma.news.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('deletes object correctly', async() => {
    prisma.news.delete = jest.fn();
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(await newsRepository.deleteById(TestData.ID)).toEqual(TestData.TEST_NEWS)
    expect(newsRepository.prisma.news.findUniqueOrThrow).toHaveBeenCalled()
    expect(newsRepository.prisma.news.delete).toHaveBeenCalled()
  }
  )
}
)  