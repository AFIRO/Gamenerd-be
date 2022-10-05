import { TestData } from "../../test.data"
import { PrismaClient } from "@prisma/client";
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
  
  it('get all by game to return objects correctly', () => {
    prisma.review.findMany = jest.fn().mockResolvedValue([TestData.TEST_REVIEW])
    expect(reviewRepository.findAllByGame(TestData.GAME_ID)).resolves.toEqual(expect.arrayContaining([TestData.TEST_REVIEW]))
    expect(reviewRepository.prisma.review.findMany).toHaveBeenCalled()
    }
    )

    it('get all by writer to return objects correctly', () => {
      prisma.review.findMany = jest.fn().mockResolvedValue([TestData.TEST_REVIEW])
      expect(reviewRepository.findAllByWriter(TestData.WRITER_ID)).resolves.toEqual(expect.arrayContaining([TestData.TEST_REVIEW]))
      expect(reviewRepository.prisma.review.findMany).toHaveBeenCalled()
      }
      )
  
  it('get by id to return object correctly',async () => {
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(reviewRepository.findById(TestData.ID)).resolves.toEqual(TestData.TEST_REVIEW)
    expect(reviewRepository.prisma.review.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('exist by id to return correct boolean',async () => {
    prisma.review.count = jest.fn().mockResolvedValue(1);
    expect(reviewRepository.existsById(TestData.NAME)).resolves.toBe(true)
    expect(reviewRepository.prisma.review.count).toHaveBeenCalled()
  }
  )

  it('creates object correctly',async () => {
    prisma.review.create = jest.fn();
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(reviewRepository.create(TestData.TEST_REVIEW_CREATE_DTO)).resolves.toEqual(TestData.TEST_REVIEW)
    expect(reviewRepository.prisma.review.create).toHaveBeenCalled();
  }
  )

  it('updates object correctly',async () => {
    prisma.review.update = jest.fn();
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(reviewRepository.updateById(TestData.ID,TestData.TEST_REVIEW_UPDATE_DTO)).resolves.toEqual(TestData.TEST_REVIEW)
    expect(reviewRepository.prisma.review.update).toHaveBeenCalled();
  }
  )

  it('deletes object correctly', async() => {
    prisma.review.delete = jest.fn();
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(reviewRepository.deleteById(TestData.ID)).resolves.toEqual(TestData.TEST_REVIEW)
  }
  )
}
)  