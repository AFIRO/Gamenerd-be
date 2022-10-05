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
  
  it('get by id to return object correctly',async () => {
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(gameRepository.findById(TestData.ID)).resolves.toEqual(TestData.TEST_GAME)
    expect(gameRepository.prisma.game.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('exist by id to return correct boolean',async () => {
    prisma.game.count = jest.fn().mockResolvedValue(1);
    expect(gameRepository.existsById(TestData.NAME)).resolves.toBe(true)
    expect(gameRepository.prisma.game.count).toHaveBeenCalled()
  }
  )

  it('creates object correctly',async () => {
    prisma.game.create = jest.fn();
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(gameRepository.create(TestData.TEST_GAME_CREATE_DTO)).resolves.toEqual(TestData.TEST_GAME)
    expect(gameRepository.prisma.game.create).toHaveBeenCalled();
  }
  )

  it('updates object correctly',async () => {
    prisma.game.update = jest.fn();
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(gameRepository.updateById(TestData.ID,TestData.TEST_GAME_UPDATE_DTO)).resolves.toEqual(TestData.TEST_GAME)
    expect(gameRepository.prisma.game.update).toHaveBeenCalled();
  }
  )

  it('deletes object correctly', async() => {
    prisma.game.delete = jest.fn();
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(gameRepository.deleteById(TestData.ID)).resolves.toEqual(TestData.TEST_GAME)
  }
  )
  
}
)  
