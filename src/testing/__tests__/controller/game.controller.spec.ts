import { Server } from "../../../server";
import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
describe('game controller tests',()=>{
    let server: Server;
    let request: supertest.SuperTest<supertest.Test>
    let prisma: PrismaClient 
    const url = '/api/games';

    beforeAll(async () => {
        server = new Server()
        request = supertest(server.getApplicationContext().callback())
        prisma = new PrismaClient()

    })

    afterAll(async () => {
		await server.stop();
	});

    it('GET returns 200 and all items', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
    })  
  })