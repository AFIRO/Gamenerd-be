import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
import { TestData } from "../../test.data";
import { Server } from '../../../server';
import { Logger } from '../../../util/logger';


describe('user controller tests',()=>{
    let request: supertest.SuperTest<supertest.Test>
    let prisma: PrismaClient 
    const url = '/api/users';
    let server: Server

    beforeAll(async () => {
      server = new Server()
      request = supertest(server.getApplicationContext().callback())
      prisma = new PrismaClient();
    })
  
    async function getAdminToken() {
      const data = await request.post("/api/login").send({ name: TestData.NAME, password: '12345678' });
      return `Bearer ${data.body.token}`
    }

    it('GET returns 200 and all items', async () => {
      const response = await request.get(url).set("Authorization", await getAdminToken());
      expect(response.status).toBe(200);
      expect(response.body.length).not.toBe(0);
      expect(response.body).toContainEqual(TestData.TEST_USER_OUTPUT_DTO)
    })
    
    it('GET by id returns 200 and specific item', async () => {
        const response = await request.get(url+"/"+TestData.ID).set("Authorization", await getAdminToken());
        expect(response.status).toBe(200);
        expect(response.body).toEqual(TestData.TEST_USER_SHORT_DTO)
      }) 

      it('POST returns 201 and created item', async () => {
        const response = await request.post(url).send({name: "createUser", password:"createUser", roles: ["ADMIN"]}).set("Authorization", await getAdminToken());
        expect(response.status).toBe(201);
        expect(response.body.name).toEqual("createUser")
        expect(response.body.roles).toEqual(["ADMIN"])
        await prisma.user.delete({where:{name: "createUser" }})
      }) 
      
      it('PUT returns 200 and updated item', async () => {
        await prisma.user.create({data:{id: "updateUser",
          name: "updateUser",
          roles: {
            connect: [{name: "ADMIN"}]
          },
          password: "updateUser"
        }})
        const gewijzigdeData = {id: "updateUser", name: "gewijzigdeNaam", password: "updateUser", roles: ["ADMIN"]}
        const response = await request.put(url+"/updateUser").send(gewijzigdeData).set("Authorization", await getAdminToken());
        expect(response.status).toBe(200);
        const logger = new Logger
        logger.error(JSON.stringify(response))
        expect(response.body.id).toEqual("updateUser");
        expect(response.body.name).toEqual("gewijzigdeNaam");
        expect(response.body.roles).toEqual(["ADMIN"]);
        //rest test item voor volgende test
        await prisma.user.delete({where: {name: "gewijzigdeNaam"}})
      }) 

      it('DELETE by id returns 200 and specific item', async () => {
        await prisma.user.create({data:{id: "deleteUser",
        name: "deleteUser",
        roles: {
          connect: [{name: "ADMIN"}]
        },
        password: "deleteUser"
      }})
        const response = await request.delete(url+"/deleteUser").set("Authorization", await getAdminToken());
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual("deleteUser");
        expect(response.body.name).toEqual("deleteUser");
        expect(response.body.roles).toEqual(["ADMIN"]);
      })
      
      it('GET all returns 400 with bad credentials', async () => {
        const response = await request.get(url);
        expect(response.status).toBe(400);
      }) 
    
      it('GET by id returns 400 with bad credentials', async () => {
        const response = await request.get(url+"/"+TestData.ID);
        expect(response.status).toBe(400);
      })
    
      it('POST returns 400 with invalid data', async () => {
        const response = await request.post(url).send({}).set("Authorization", await getAdminToken());
        expect(response.status).toBe(400);
      })
    
      it('POST returns 400 with bad credentials', async () => {
        const response = await request.post(url).send({name: "createUser", password: "createUser", roles: ["ADMIN"] });
        expect(response.status).toBe(400);
      })
    
      it('PUT returns 400 with invalid data', async () => {
        const response = await request.put(url + "/updateUser").send({}).set("Authorization", await getAdminToken());
        expect(response.status).toBe(400);
      })
    
      it('PUT returns 400 with bad credentials', async () => {
        const response = await request.put(url + "/updateUser").send({id: "updateUser", name: "updateUser", password: "updateUser", roles: ["ADMIN"] });
        expect(response.status).toBe(400);
      })
    
      it('PUT returns 400 when id in url and dto do not match', async () => {
        const data = {id: "WRONG", name: "createUser", password: "createUser", roles: ["ADMIN"] }
        const response = await request.put(url + "/updateUser").send(data).set("Authorization", await getAdminToken());
        expect(response.status).toBe(400);
      })
    
      it('DELETE by id returns 400 with bad credentials', async () => {
        const response = await request.delete(url + "/deleteUser");
        expect(response.status).toBe(400);
      })
  })