import { GameRepository } from "../../../repository/game.repository"
import { TestData } from "../../test.data"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
const gameRepository = new GameRepository();
gameRepository.prisma = prisma


describe('game repository tests',()=>{
  it('get all to return objects correctly',async () => {
  prisma.game.findMany = jest.fn().mockResolvedValue([TestData.TEST_GAME])
  expect(await gameRepository.findAll()).toEqual(expect.arrayContaining([TestData.TEST_GAME]))
  expect(gameRepository.prisma.game.findMany).toHaveBeenCalled()
  }) 
  
  it('get by id to return object correctly',async () => {
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(await gameRepository.findById(TestData.ID)).toEqual(TestData.TEST_GAME)
    expect(gameRepository.prisma.game.findUniqueOrThrow).toHaveBeenCalled()
  }
  )

  it('exist by id to return correct boolean',async () => {
    prisma.game.count = jest.fn().mockResolvedValue(1);
    expect(await gameRepository.existsById(TestData.NAME)).toBe(true)
    expect(gameRepository.prisma.game.count).toHaveBeenCalled()
  }
  )

  it('creates object correctly',async () => {
    prisma.game.create = jest.fn();
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(await gameRepository.create(TestData.TEST_GAME_CREATE_DTO)).toEqual(TestData.TEST_GAME)
    expect(gameRepository.prisma.game.create).toHaveBeenCalled();
    expect(gameRepository.prisma.game.findUniqueOrThrow).toHaveBeenCalled();
  }
  )

  it('updates object correctly',async () => {
    prisma.game.update = jest.fn();
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(await gameRepository.updateById(TestData.ID,TestData.TEST_GAME_UPDATE_DTO)).toEqual(TestData.TEST_GAME)
    expect(gameRepository.prisma.game.update).toHaveBeenCalled();
    expect(gameRepository.prisma.game.findUniqueOrThrow).toHaveBeenCalled();
  }
  )

  it('deletes object correctly', async() => {
    prisma.game.delete = jest.fn();
    prisma.game.findUniqueOrThrow = jest.fn().mockResolvedValue(TestData.TEST_GAME);
    expect(await gameRepository.deleteById(TestData.ID)).toEqual(TestData.TEST_GAME)
    expect(gameRepository.prisma.game.delete).toHaveBeenCalled();
    expect(gameRepository.prisma.game.findUniqueOrThrow).toHaveBeenCalled();
  }
  )
  
}
)  
