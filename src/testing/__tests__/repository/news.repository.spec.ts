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
}
)  