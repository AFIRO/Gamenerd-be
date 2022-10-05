import { TestData } from "../../test.data"
import { PrismaClient } from "@prisma/client";
import { NewsRepository } from "../../../repository/news.repository";
import { ReviewRepository } from "../../../repository/review.repository";

const prisma = new PrismaClient()
const reviewRepository = new ReviewRepository();
reviewRepository.prisma = prisma

describe('user repository tests',()=>{
  it('get all to return objects correctly', () => {
  prisma.review.findMany = jest.fn().mockResolvedValue([TestData.TEST_REVIEW])
  expect(reviewRepository.findAll()).resolves.toEqual(expect.arrayContaining([TestData.TEST_REVIEW]))
  expect(reviewRepository.prisma.review.findMany).toHaveBeenCalled()
  }
  ) 
}
)  