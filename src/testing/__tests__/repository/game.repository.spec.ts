import { GameRepository } from "../../../repository/game.repository"
import { TestData } from "../../test.data"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
const gameRepository = new GameRepository();
gameRepository.prisma = prisma


describe('game repository tests',()=>{
  it('get all to return objects correctly', () => {
  prisma.game.findMany = jest.fn().mockResolvedValue([TestData.TEST_GAME])
  expect(gameRepository.findAll()).resolves.toEqual(expect.arrayContaining([TestData.TEST_GAME]))
  expect(gameRepository.prisma.game.findMany).toHaveBeenCalled()
  }) 
  
  
}
)  
