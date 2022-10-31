import { TestData } from "../../test.data"
import { PrismaClient } from "@prisma/client";
import { ReviewRepository } from "../../../repository/review.repository";

const prisma = new PrismaClient()
const reviewRepository = new ReviewRepository();
reviewRepository.prisma = prisma

describe('user repository tests', () => {
  it('get all to return objects correctly', async () => {
    prisma.review.findMany = jest.fn().mockResolvedValue([TestData.TEST_REVIEW])
    expect(await reviewRepository.findAll()).toEqual(expect.arrayContaining([TestData.TEST_REVIEW]))
    expect(reviewRepository.prisma.review.findMany).toHaveBeenCalled()
  }
  )

  it('get all by game to return objects correctly', async () => {
    prisma.review.findMany = jest.fn().mockResolvedValue([TestData.TEST_REVIEW])
    expect(await reviewRepository.findAllByGame(TestData.GAME_ID)).toEqual(expect.arrayContaining([TestData.TEST_REVIEW]))
    expect(reviewRepository.prisma.review.findMany).toHaveBeenCalled()
  }
  )

  it('get all by writer to return objects correctly', async () => {
    prisma.review.findMany = jest.fn().mockResolvedValue([TestData.TEST_REVIEW])
    expect(await reviewRepository.findAllByWriter(TestData.WRITER_ID)).toEqual(expect.arrayContaining([TestData.TEST_REVIEW]))
    expect(reviewRepository.prisma.review.findMany).toHaveBeenCalled()
  }
  )

  it('get by id to return object correctly', async () => {
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(await reviewRepository.findById(TestData.ID)).toEqual(TestData.TEST_REVIEW)
    expect(reviewRepository.prisma.review.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('exist by id to return correct boolean', async () => {
    prisma.review.count = jest.fn().mockResolvedValue(1);
    expect(await reviewRepository.existsById(TestData.NAME)).toBe(true)
    expect(reviewRepository.prisma.review.count).toHaveBeenCalled()
  }
  )

  it('creates object correctly', async () => {
    prisma.review.create = jest.fn();
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(await reviewRepository.create(TestData.TEST_REVIEW_CREATE_DTO)).toEqual(TestData.TEST_REVIEW)
    expect(reviewRepository.prisma.review.create).toHaveBeenCalled();
    expect(reviewRepository.prisma.review.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('updates object correctly', async () => {
    prisma.review.update = jest.fn();
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(await reviewRepository.updateById(TestData.ID, TestData.TEST_REVIEW_UPDATE_DTO)).toEqual(TestData.TEST_REVIEW)
    expect(reviewRepository.prisma.review.update).toHaveBeenCalled();
    expect(reviewRepository.prisma.review.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('deletes object correctly', async () => {
    prisma.review.delete = jest.fn();
    prisma.review.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_REVIEW);
    expect(await reviewRepository.deleteById(TestData.ID)).toEqual(TestData.TEST_REVIEW)
    expect(reviewRepository.prisma.review.findUniqueOrThrow).toHaveBeenCalled()
    expect(reviewRepository.prisma.review.delete).toHaveBeenCalled()

  }
  )
}
)  