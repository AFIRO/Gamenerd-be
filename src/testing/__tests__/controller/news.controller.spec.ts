import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
import { TestData } from "../../test.data";
import { Server } from '../../../server';

describe('news controller tests', () => {
  let request: supertest.SuperTest<supertest.Test>
  let prisma: PrismaClient
  const url = '/api/news';
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

  async function getWriterToken() {
    const data = await request.post("/api/login").send({ name: "TestWriter", password: '12345678' });
    return `Bearer ${data.body.token}`
  }

  it('GET returns 200 and all items', async () => {
    const response = await request.get(url).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(TestData.TEST_NEWS_OUTPUT_DTO)
  })

  it('GET by writer returns 200 and correct items', async () => {
    const response = await request.get(url + "/byWriter/" + TestData.ID).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(TestData.TEST_NEWS_OUTPUT_DTO)
  })

  it('GET by game returns 200 and correct items', async () => {
    const response = await request.get(url + "/byGame/" + TestData.ID).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(TestData.TEST_NEWS_OUTPUT_DTO)
  })


  it('GET by id returns 200 and specific item', async () => {
    const response = await request.get(url + "/" + TestData.ID).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body).toEqual(TestData.TEST_NEWS_OUTPUT_DTO)
  })

  it('POST returns 201 and created item', async () => {
    await prisma.game.create({ data: { id: "helperNewsGame", name: "helperNewsGame", boxart: "helperNewsGame" } })
    await prisma.user.create({
      data: {
        id: "helperNewsUser",
        name: "helperNewsUser",
        roles: {
          connect: [{ name: "ADMIN" }]
        },
        password: "helperNewsUser"
      }
    })
    const response = await request.post(url).send({ content: "createGame", writerId: "helperNewsUser", gameId: "helperNewsGame" }).set("Authorization", await getWriterToken());
    expect(response.status).toBe(201);
    expect(response.body.content).toEqual("createGame")
    expect(response.body.writer.id).toEqual("helperNewsUser")
    expect(response.body.writer.name).toEqual("helperNewsUser")
    expect(response.body.game.id).toEqual("helperNewsGame")
    expect(response.body.game.name).toEqual("helperNewsGame")
    expect(response.body.game.boxart).toEqual("helperNewsGame")
    //reset
    await prisma.news.delete({ where: { content: "createGame" } })
    await prisma.game.delete({ where: { id: "helperNewsGame" } })
    await prisma.user.delete({ where: { id: "helperNewsUser" } })
  })

  it('PUT returns 200 and update item', async () => {
    await prisma.game.create({ data: { id: "helperNewsGame", name: "helperNewsGame", boxart: "helperNewsGame" } })
    await prisma.user.create({
      data: {
        id: "helperNewsUser",
        name: "helperNewsUser",
        roles: {
          connect: [{ name: "ADMIN" }]
        },
        password: "helperNewsUser"
      }
    })
    await prisma.news.create({ data: { id: "updateNews", content: "content", writerId: "helperNewsUser", gameId: "helperNewsGame" } })
    const gewijzigdeData = { id: "updateNews", content: "gewijzigdeContent", writerId: "helperNewsUser", gameId: "helperNewsGame" }
    const response = await request.put(url + "/updateNews").send(gewijzigdeData).set("Authorization", await getWriterToken());
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual("updateNews");
    expect(response.body.content).toEqual("gewijzigdeContent")
    expect(response.body.writer.id).toEqual("helperNewsUser")
    expect(response.body.writer.name).toEqual("helperNewsUser")
    expect(response.body.game.id).toEqual("helperNewsGame")
    expect(response.body.game.name).toEqual("helperNewsGame")
    expect(response.body.game.boxart).toEqual("helperNewsGame")
    //reset
    await prisma.news.delete({ where: { id: "updateNews" } })
    await prisma.game.delete({ where: { id: "helperNewsGame" } })
    await prisma.user.delete({ where: { id: "helperNewsUser" } })
  })

  it('DELETE by id returns 200 and specific item', async () => {
    await prisma.game.create({ data: { id: "helperNewsGame", name: "helperNewsGame", boxart: "helperNewsGame" } })
    await prisma.user.create({
      data: {
        id: "helperNewsUser",
        name: "helperNewsUser",
        roles: {
          connect: [{ name: "ADMIN" }]
        },
        password: "helperNewsUser"
      }
    })
    await prisma.news.create({ data: { id: "deleteNews", content: "deleteNews", writerId: "helperNewsUser", gameId: "helperNewsGame" } })
    const response = await request.delete(url + "/deleteNews").set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual("deleteNews");
    expect(response.body.content).toEqual("deleteNews")
    expect(response.body.writer.id).toEqual("helperNewsUser")
    expect(response.body.writer.name).toEqual("helperNewsUser")
    expect(response.body.game.id).toEqual("helperNewsGame")
    expect(response.body.game.name).toEqual("helperNewsGame")
    expect(response.body.game.boxart).toEqual("helperNewsGame")
    //reset
    await prisma.game.delete({ where: { id: "helperNewsGame" } })
    await prisma.user.delete({ where: { id: "helperNewsUser" } })
  })

  it('GET all returns 400 with bad credentials', async () => {
    const response = await request.get(url);
    expect(response.status).toBe(400);
  })

  it('GET all by writer returns 400 with bad credentials', async () => {
    const response = await request.get(url + "/byWriter/" + TestData.ID);
    expect(response.status).toBe(400);
  })

  it('GET all by game returns 400 with bad credentials', async () => {
    const response = await request.get(url + "/byWriter/" + TestData.ID);
    expect(response.status).toBe(400);
  })

  it('GET by id returns 400 with bad credentials', async () => {
    const response = await request.get(url + "/" + TestData.ID);
    expect(response.status).toBe(400);
  })

  it('POST returns 400 with invalid data', async () => {
    const response = await request.post(url).send({}).set("Authorization", await getWriterToken());
    expect(response.status).toBe(400);
  })

  it('POST returns 400 with bad credentials', async () => {
    const response = await request.post(url).send({ content: "createNews", writerId: "helperNewsUser", gameId: "helperNewsGame", score: 10 });
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 with invalid data', async () => {
    const response = await request.put(url + "/updateNews").send({}).set("Authorization", await getWriterToken());
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 with bad credentials', async () => {
    const response = await request.put(url + "/updateNews").send({ content: "createNews", writerId: "helperNewsUser", gameId: "helperNewsGame", score: 10 });
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 when id in url and dto do not match', async () => {
    const data = { id: "WRONG", content: "gewijzigdeContent", writerId: "helperNewsUser", gameId: "helperNewsGame", score: 10 }
    const response = await request.put(url + "/updateNews").send(data).set("Authorization", await getWriterToken());
    expect(response.status).toBe(400);
  })

  it('DELETE by id returns 400 with bad credentials', async () => {
    const response = await request.delete(url + "/deleteNews");
    expect(response.status).toBe(400);
  })
})