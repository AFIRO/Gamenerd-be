import { PrismaClient } from "@prisma/client";
import { TestData } from "../../src/testing/test.data";


module.exports = async () => {
  const prisma = new PrismaClient()
  await prisma.user.create({data: TestData.PRISMA_USER_WRITER})
  await prisma.game.create({data: TestData.TEST_GAME})
  await prisma.user.create({data: TestData.PRISMA_USER})
  await prisma.review.create({data: TestData.testReview})
  await prisma.news.create({data: TestData.testNews})
}


