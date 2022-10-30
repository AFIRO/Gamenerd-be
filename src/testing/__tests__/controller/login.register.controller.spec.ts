import { PrismaClient } from '@prisma/client';
import supertest from 'supertest';
import { Server } from '../../../server';
import { TestData } from "../../test.data";

describe('login and registration controller tests',()=>{
    let request: supertest.SuperTest<supertest.Test>
    let server: Server
    let prisma:PrismaClient

    beforeAll(async () =>  {
      server = new Server()
      request = supertest(server.getApplicationContext().callback())
      prisma = new PrismaClient()
    })
    
    it('LOGIN returns 200 and user info with token', async () => {
      const response = await request.post("/api/login").send({name: TestData.NAME, password: '12345678'});
      expect(response.status).toBe(200);
      expect(response.body.user.id).toEqual(TestData.ID)
      expect(response.body.user.name).toEqual(TestData.NAME)
      expect(response.body.user.roles).toEqual(TestData.ROLES)
    })

    it('LOGIN with no data returns 400', async () => {
      const response = await request.post("/api/login").send({});
      expect(response.status).toBe(400);
    })

    it('LOGIN with wrong password returns 400', async () => {
      const response = await request.post("/api/login").send({name: TestData.NAME, password: 'WRONG'});
      expect(response.status).toBe(400);
    })
    
    
    it('REGISTER returns 201 and user info with token', async () => {
        const response = await request.post("/api/register").send({name: "registerTest", password: "12345678"});
        expect(response.status).toBe(201);
        expect(response.body.user.name).toEqual("registerTest")
        expect(response.body.user.roles).toEqual([])

        //reset
        await prisma.user.delete({where: {name: "registerTest"}})
      })
      
      it('REGISTER with no data returns 400', async () => {
        const response = await request.post("/api/register").send({});
        expect(response.status).toBe(400);
      }) 

      it('REGISTER with existing data returns 400', async () => {
        const response = await request.post("/api/register").send({name: TestData.NAME, password: '12345678', roles: TestData.ROLES});
        expect(response.status).toBe(400);
      }) 
  })