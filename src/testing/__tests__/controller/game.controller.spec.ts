import { Server } from "../../../server";
import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
import { TestData } from "../../test.data";

describe('game controller tests',()=>{
    let server: Server;
    let request: supertest.SuperTest<supertest.Test>
    let prisma: PrismaClient 
    const url = '/api/games';

     beforeAll(async () => {
        server = new Server()
        await server.start()
        request = supertest(server.getApplicationContext().callback())
        prisma = new PrismaClient()
        await prisma.game.create({data: TestData.TEST_GAME_CREATE_DTO})

    })

    afterAll(async () => {
        await prisma.game.delete({where: {id: TestData.ID}})
		await server.stop();
	});

    it('GET returns 200 and all items', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).not.toBe(0);
      expect(response.body.data).toContain(TestData.TEST_GAME_OUTPUT_DTO)
    })
    
    it('GET by id returns 200 and specific item', async () => {
        const response = await request.get(url+"/"+TestData.ID);
        expect(response.status).toBe(200);
        expect(response.body.limit).toBe(100);
        expect(response.body.offset).toBe(0);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toContain(TestData.TEST_GAME_OUTPUT_DTO)
      }) 

      it('POST returns 201 and created item', async () => {
        prisma.game.delete({where: {id: TestData.ID}})
        const response = await request.post(url).send(TestData.TEST_USER_CREATE_DTO);
        expect(response.status).toBe(201);
        expect(response.body.limit).toBe(100);
        expect(response.body.offset).toBe(0);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toContain(TestData.TEST_GAME_OUTPUT_DTO)
      }) 
      
      it('PUT returns 200 and created item', async () => {
        const gewijzigdeData = TestData.TEST_GAME_UPDATE_DTO;
        gewijzigdeData.name = "gewijzigdeNaam";
        const response = await request.put(url+"/"+TestData.ID).send(gewijzigdeData);
        expect(response.status).toBe(200);
        expect(response.body.limit).toBe(100);
        expect(response.body.offset).toBe(0);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toContain(gewijzigdeData);
        //rest test item voor volgende test
        await prisma.game.delete({where: {id: TestData.ID}})
        await prisma.game.create({data: TestData.TEST_GAME_CREATE_DTO})
      }) 

      it('DELETE by id returns 200 and specific item', async () => {
        const response = await request.delete(url+"/"+TestData.ID);
        expect(response.status).toBe(200);
        expect(response.body.limit).toBe(100);
        expect(response.body.offset).toBe(0);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toContain(TestData.TEST_GAME_OUTPUT_DTO)
        //rest test item voor volgende test
        await prisma.game.create({data: TestData.TEST_GAME_CREATE_DTO})
      }) 
  })