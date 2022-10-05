import { TestData } from "../../test.data"
import { PrismaClient } from "@prisma/client";
import { NewsRepository } from "../../../repository/news.repository";

const prisma = new PrismaClient()
const newsRepository = new NewsRepository();
newsRepository.prisma = prisma

describe('user repository tests',()=>{
  it('get all to return objects correctly', () => {
  prisma.news.findMany = jest.fn().mockResolvedValue([TestData.TEST_NEWS])
  expect(newsRepository.findAll()).resolves.toEqual(expect.arrayContaining([TestData.TEST_NEWS]))
  expect(newsRepository.prisma.news.findMany).toHaveBeenCalled()
  }
  )

  it('get all by game to return objects correctly', () => {
    prisma.news.findMany = jest.fn().mockResolvedValue([TestData.TEST_NEWS])
    expect(newsRepository.findAllByGame(TestData.GAME_ID)).resolves.toEqual(expect.arrayContaining([TestData.TEST_NEWS]))
    expect(newsRepository.prisma.news.findMany).toHaveBeenCalled()
    }
    )

    it('get all by writer to return objects correctly', () => {
      prisma.news.findMany = jest.fn().mockResolvedValue([TestData.TEST_NEWS])
      expect(newsRepository.findAllByWriter(TestData.WRITER_ID)).resolves.toEqual(expect.arrayContaining([TestData.TEST_NEWS]))
      expect(newsRepository.prisma.news.findMany).toHaveBeenCalled()
      }
      )
  
  it('get by id to return object correctly',async () => {
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(newsRepository.findById(TestData.ID)).resolves.toEqual(TestData.TEST_NEWS)
    expect(newsRepository.prisma.news.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('exist by id to return correct boolean',async () => {
    prisma.news.count = jest.fn().mockResolvedValue(1);
    expect(newsRepository.existsById(TestData.NAME)).resolves.toBe(true)
    expect(newsRepository.prisma.news.count).toHaveBeenCalled()
  }
  )

  it('creates object correctly',async () => {
    prisma.news.create = jest.fn();
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(newsRepository.create(TestData.TEST_NEWS_CREATE_DTO)).resolves.toEqual(TestData.TEST_NEWS)
    expect(newsRepository.prisma.news.create).toHaveBeenCalled();
  }
  )

  it('updates object correctly',async () => {
    prisma.news.update = jest.fn();
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(newsRepository.updateById(TestData.ID,TestData.TEST_NEWS_UPDATE_DTO)).resolves.toEqual(TestData.TEST_NEWS)
    expect(newsRepository.prisma.news.update).toHaveBeenCalled();
  }
  )

  it('deletes object correctly', async() => {
    prisma.news.delete = jest.fn();
    prisma.news.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_NEWS);
    expect(newsRepository.deleteById(TestData.ID)).resolves.toEqual(TestData.TEST_NEWS)
  }
  )
}
)  