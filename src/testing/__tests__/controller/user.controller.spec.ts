// import supertest from 'supertest';
// import { PrismaClient } from "@prisma/client";
// import { TestData } from "../../test.data";
// import { Server } from '../../../server';
// import { Logger } from '../../../util/logger';


// describe('user controller tests',()=>{
//     let request: supertest.SuperTest<supertest.Test>
//     let prisma: PrismaClient 
//     const url = '/api/users';
//     let server: Server

//     beforeAll(async () => {
//       server = new Server()
//       request = supertest(server.getApplicationContext().callback())
//       prisma = new PrismaClient();
//     })
  
//     async function getAdminToken() {
//       const data = await request.post("/api/login").send({ name: TestData.NAME, password: '12345678' });
//       return `Bearer ${data.body.token}`
//     }

//     it('GET returns 200 and all items', async () => {
//       const response = await request.get(url).set("Authorization", await getAdminToken());
//       expect(response.status).toBe(200);
//       expect(response.body.data.length).not.toBe(0);
//       expect(response.body.data).toContainEqual(TestData.TEST_USER_OUTPUT_DTO)
//     })
    
//     it('GET by id returns 200 and specific item', async () => {
//         const response = await request.get(url+"/"+TestData.ID).set("Authorization", await getAdminToken());
//         expect(response.status).toBe(200);
//         expect(response.body.data).toEqual(TestData.TEST_USER_SHORT_DTO)
//       }) 

//       it('POST returns 201 and created item', async () => {
//         const response = await request.post(url).send({name: "createUser", password:"createUser", roles: ["ADMIN"]}).set("Authorization", await getAdminToken());
//         expect(response.status).toBe(201);
//         expect(response.body.data.name).toEqual("createUser")
//         expect(response.body.data.roles).toEqual(["ADMIN"])
//         await prisma.user.delete({where:{name: "createUser" }})
//       }) 
      
//       it('PUT returns 200 and updated item', async () => {
//         await prisma.user.create({data:{id: "updateUser",
//           name: "updateUser",
//           roles: {
//             connect: [{name: "ADMIN"}]
//           },
//           password: "updateUser"
//         }})
//         const gewijzigdeData = {id: "updateUser", name: "gewijzigdeNaam", password: "updateUser", roles: ["ADMIN"]}
//         const response = await request.put(url+"/updateUser").send(gewijzigdeData).set("Authorization", await getAdminToken());
//         expect(response.status).toBe(200);
//         const logger = new Logger
//         logger.error(JSON.stringify(response))
//         expect(response.body.data.id).toEqual("updateUser");
//         expect(response.body.data.name).toEqual("gewijzigdeNaam");
//         expect(response.body.data.roles).toEqual(["ADMIN"]);
//         //rest test item voor volgende test
//         await prisma.user.delete({where: {name: "gewijzigdeNaam"}})
//       }) 

//       it('DELETE by id returns 200 and specific item', async () => {
//         await prisma.user.create({data:{id: "deleteUser",
//         name: "deleteUser",
//         roles: {
//           connect: [{name: "ADMIN"}]
//         },
//         password: "deleteUser"
//       }})
//         const response = await request.delete(url+"/deleteUser").set("Authorization", await getAdminToken());
//         expect(response.status).toBe(200);
//         expect(response.body.data.id).toEqual("deleteUser");
//         expect(response.body.data.name).toEqual("deleteUser");
//         expect(response.body.data.roles).toEqual(["ADMIN"]);
//       }) 
//   })