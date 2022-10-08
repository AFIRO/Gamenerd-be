import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
import { TestData } from "../../test.data";
import { Server } from '../../../server';
import { Logger } from '../../../util/logger';

describe('game controller tests', () => {
  let request: supertest.SuperTest<supertest.Test>
  let prisma: PrismaClient
  let server: Server
  const logger = new Logger()
  const url = '/api/games';

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
    const response = await request.get(url).set("Authorization", await getAdminToken())
    expect(response.status).toBe(200);
    expect(response.body.data.length).not.toBe(0);
    expect(response.body.data).toContainEqual(TestData.TEST_GAME_OUTPUT_DTO)
  })

  it('GET by id returns 200 and specific item', async () => {
    const response = await request.get(url + "/" + TestData.ID).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(TestData.TEST_GAME_OUTPUT_DTO)
  })

  it('POST returns 201 and created item', async () => {
    const response = await request.post(url).send({ name: "createGame", boxart: "createBoxart" }).set("Authorization", await getAdminToken());
    expect(response.body.data.name).toEqual("createGame")
    expect(response.body.data.boxart).toEqual("createBoxart")
    await prisma.game.delete({ where: { id: response.body.data.id } })
  })

  it('PUT returns 200 and update item', async () => {
    await prisma.game.create({ data: { id: "updateGame", name: "teWijzigenNaam", boxart: "maaktnietuit" } })
    const gewijzigdeData = { id: "updateGame", name: "gewijzigdeNaam", boxart: "maaktnietuit" };
    const response = await request.put(url + "/" + "updateGame").send(gewijzigdeData).set("Authorization", await getAdminToken());
    logger.error(JSON.stringify(response))
    expect(response.status).toBe(200);;
    expect(response.body.data.name).toEqual("gewijzigdeNaam");
    //rest test item voor volgende test
    await prisma.game.delete({ where: { id: "updateGame" } })
  })

  it('DELETE by id returns 200 and specific item', async () => {
    await prisma.game.create({ data: { id: "deleteGame", name: "deleteGame", boxart: "deleteGame" } })
    const response = await request.delete(url + "/" + "deleteGame").set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.data.id).toEqual("deleteGame")
    expect(response.body.data.name).toEqual("deleteGame")
    expect(response.body.data.boxart).toEqual("deleteGame")
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
    const response = await request.post(url).send({name: "createGame", boxart: "createGame"});
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 with invalid data', async () => {
    const response = await request.put(url + "/updateGame").send({}).set("Authorization", await getAdminToken());
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 with bad credentials', async () => {
    const response = await request.put(url + "/updateGame").send({id:"updateGame", name: "updateGame", boxart: "updateGame"});
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 when id in url and dto do not match', async () => {
    const data = {id: "WRONG", name: "updateGame", boxart: "updateGame"}
    const response = await request.put(url + "/updateGame").send(data).set("Authorization", await getAdminToken());
    expect(response.status).toBe(400);
  })

  it('DELETE by id returns 400 with bad credentials', async () => {
    const response = await request.delete(url + "/deleteGame");
    expect(response.status).toBe(400);
  })
})