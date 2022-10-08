// import supertest from 'supertest';
// import { PrismaClient } from "@prisma/client";
// import { TestData } from "../../test.data";
// import { TestHelpers } from '../../../../config/test/test.helpers';
// const { withServer, LoginAdmin } = require('../../../../config/test/supertest.setup');

// describe('user controller tests',()=>{
//     let request: supertest.SuperTest<supertest.Test>
//     let prisma: PrismaClient 
//     const url = '/api/users';
//     let loginHeader: string

//     // withServer(({ prisma: p, supertest:s }) => {
//     //   prisma = p;
//     //   request = s;
//     // });

//     beforeAll(async () =>  {
//       loginHeader = await TestHelpers.loginAdmin(request)
//   })

//     it('GET returns 200 and all items', async () => {
//       const response = await request.get(url);
//       expect(response.status).toBe(200);
//       expect(response.body.limit).toBe(100);
//       expect(response.body.offset).toBe(0);
//       expect(response.body.data.length).not.toBe(0);
//       expect(response.body.data).toContain(TestData.TEST_USER_OUTPUT_DTO)
//     })
    
//     it('GET by id returns 200 and specific item', async () => {
//         const response = await request.get(url+"/"+TestData.ID);
//         expect(response.status).toBe(200);
//         expect(response.body.limit).toBe(100);
//         expect(response.body.offset).toBe(0);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.data).toContain(TestData.TEST_USER_SHORT_DTO)
//       }) 

//       it('POST returns 201 and created item', async () => {
//         prisma.game.delete({where: {id: TestData.ID}})
//         const response = await request.post(url).send(TestData.TEST_USER_CREATE_DTO);
//         expect(response.status).toBe(201);
//         expect(response.body.limit).toBe(100);
//         expect(response.body.offset).toBe(0);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.data).toContain(TestData.TEST_USER_OUTPUT_DTO)
//       }) 
      
//       it('PUT returns 200 and created item', async () => {
//         const gewijzigdeData = TestData.TEST_USER_CREATE_DTO;
//         gewijzigdeData.name = "gewijzigdeNaam";
//         const response = await request.put(url+"/"+TestData.ID).send(gewijzigdeData);
//         expect(response.status).toBe(200);
//         expect(response.body.limit).toBe(100);
//         expect(response.body.offset).toBe(0);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.data).toContain(gewijzigdeData);
//         //rest test item voor volgende test
//         await prisma.user.delete({where: {id: TestData.ID}})
//         await prisma.user.create({data: TestData.PRISMA_USER})
//       }) 

//       it('DELETE by id returns 200 and specific item', async () => {
//         const response = await request.delete(url+"/"+TestData.ID);
//         expect(response.status).toBe(200);
//         expect(response.body.limit).toBe(100);
//         expect(response.body.offset).toBe(0);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.data).toContain(TestData.TEST_USER_OUTPUT_DTO)
//         //rest test item voor volgende test
//         await prisma.user.create({data: TestData.PRISMA_USER})
//       }) 
//   })