import { PrismaClient } from "@prisma/client";
import { TestData } from "../../src/testing/test.data";

module.exports = async () => {
  const prisma = new PrismaClient()
  const testReview = {id: TestData.ID, content: TestData.CONTENT, writerId:TestData.ID, gameId:TestData.ID, score: TestData.SCORE}
  const testNews = {id: TestData.ID, content: TestData.CONTENT, writerId:TestData.ID, gameId:TestData.ID}
  await prisma.game.create({data: TestData.TEST_GAME})
  await prisma.user.create({data: TestData.PRISMA_USER})
  await prisma.user.create({data: TestData.PRISMA_USER_WRITER})
  await prisma.review.create({data: testReview})
  await prisma.news.create({data: testNews})
}


