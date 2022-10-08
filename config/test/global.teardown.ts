import { PrismaClient } from "@prisma/client";
import { TestData } from "../../src/testing/test.data";


module.exports = async () => {
  const prisma = new PrismaClient()
  await prisma.review.delete({where: {id:TestData.ID}})
  await prisma.news.delete({where: {id:TestData.ID}})
  await prisma.user.delete({where: {id:TestData.ID}})
  await prisma.user.delete({where: {id:"TestWriter"}})
  await prisma.game.delete({where: {id:TestData.ID}})
}