import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
import { TestData } from "../../test.data";
const { withServer } = require('../../../../config/test/supertest.setup');

describe('login and registration controller tests',()=>{
    let request: supertest.SuperTest<supertest.Test>
    let prisma: PrismaClient

    withServer(({ prisma: p, supertest:s }) => {
        prisma = p;
        request = s;
      });
    
    it('POST returns 200 and user info with token', async () => {
      const response = await request.post("/login").send(TestData.TEST_LOGIN_DATA_DTO);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).not.toBe(0);
      expect(response.body.data).toContain(TestData.TEST_USER_TOKEN_DTO)
    })
    
    it('REGISTER returns 201 and user info with token', async () => {
        await prisma.user.delete({where: {id: TestData.ID}})
        const response = await request.get("/register").send(TestData.TEST_USER_CREATE_DTO);
        expect(response.status).toBe(201);
        expect(response.body.limit).toBe(100);
        expect(response.body.offset).toBe(0);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toContain(TestData.TEST_USER_TOKEN_DTO)
        await prisma.user.create({data: TestData.TEST_USER_CREATE_DTO})
      }) 
  })