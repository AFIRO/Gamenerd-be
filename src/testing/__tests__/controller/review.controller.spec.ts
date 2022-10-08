import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
import { TestData } from "../../test.data";
import { Server } from '../../../server';
import { Logger } from '../../../util/logger';

describe('news controller tests', () => {
  let request: supertest.SuperTest<supertest.Test>
  let prisma: PrismaClient
  const url = '/api/reviews';
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

  // it('GET returns 200 and all items', async () => {
  //   const response = await request.get(url).set("Authorization", await getAdminToken());
  //   expect(response.status).toBe(200);
  //   expect(response.body.data).toContainEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
  // })

  // it('GET by id returns 200 and specific item', async () => {
  //   const response = await request.get(url + "/" + TestData.ID).set("Authorization", await getAdminToken());
  //   expect(response.status).toBe(200);
  //   expect(response.body.data).toEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
  // })

  // it('POST returns 201 and created item', async () => {
  //   await prisma.game.create({ data: { id: "helperGame", name: "helperGame", boxart: "helperGame" } })
  //   await prisma.user.create({
  //     data: {
  //       id: "helperUser",
  //       name: "helperUser",
  //       roles: {
  //         connect: [{ name: "ADMIN" }]
  //       },
  //       password: "helperUser"
  //     }
  //   })
  //   const response = await request.post(url).send({ content: "createReview", writerId: "helperUser", gameId: "helperGame", score: 10 }).set("Authorization", await getWriterToken());
  //   expect(response.status).toBe(201);
  //   expect(response.body.data.content).toEqual("createReview")
  //   expect(response.body.data.score).toEqual(10)
  //   expect(response.body.data.writer.id).toEqual("helperUser")
  //   expect(response.body.data.writer.name).toEqual("helperUser")
  //   expect(response.body.data.game.id).toEqual("helperGame")
  //   expect(response.body.data.game.name).toEqual("helperGame")
  //   expect(response.body.data.game.boxart).toEqual("helperGame")
  //   //reset
  //   await prisma.review.delete({ where: { content: "createReview" } })
  //   await prisma.game.delete({ where: { id: "helperGame" } })
  //   await prisma.user.delete({ where: { id: "helperUser" } })
  // })

  // it('PUT returns 200 and update item', async () => {
  //   await prisma.game.create({ data: { id: "helperGame", name: "helperGame", boxart: "helperGame" } })
  //   await prisma.user.create({
  //     data: {
  //       id: "helperUser",
  //       name: "helperUser",
  //       roles: {
  //         connect: [{ name: "ADMIN" }]
  //       },
  //       password: "helperUser"
  //     }
  //   })
  //   await prisma.review.create({ data: { id: "updateReview", content: "content", writerId: "helperUser", gameId: "helperGame", score: 10 } })
  //   const gewijzigdeData = { id: "updateReview", content: "gewijzigdeContent", writerId: "helperUser", gameId: "helperGame", score: 10 }
  //   const response = await request.put(url + "/updateReview").send(gewijzigdeData).set("Authorization", await getWriterToken());
  //   expect(response.status).toBe(200);
  //   expect(response.body.data.id).toEqual("updateReview");
  //   expect(response.body.data.content).toEqual("gewijzigdeContent")
  //   expect(response.body.data.score).toEqual(10)
  //   expect(response.body.data.writer.id).toEqual("helperUser")
  //   expect(response.body.data.writer.name).toEqual("helperUser")
  //   expect(response.body.data.game.id).toEqual("helperGame")
  //   expect(response.body.data.game.name).toEqual("helperGame")
  //   expect(response.body.data.game.boxart).toEqual("helperGame")
  //   //reset
  //   await prisma.review.delete({ where: { id: "updateReview" } })
  //   await prisma.game.delete({ where: { id: "helperGame" } })
  //   await prisma.user.delete({ where: { id: "helperUser" } })
  // })

  it('DELETE by id returns 200 and specific item', async () => {
    await prisma.game.create({ data: { id: "helperGame", name: "helperGame", boxart: "helperGame" } })
    await prisma.user.create({
      data: {
        id: "helperUser",
        name: "helperUser",
        roles: {
          connect: [{ name: "ADMIN" }]
        },
        password: "helperUser"
      }
    })
    await prisma.review.create({ data: { id: "deleteReview", content: "deleteReview", writerId: "helperUser", gameId: "helperGame", score: 10 } })
    const response = await request.delete(url + "/deleteReview").set("Authorization", await getAdminToken());
    const logger = new Logger
    logger.error(JSON.stringify(response))
    expect(response.status).toBe(200);
    expect(response.body.data.id).toEqual("deleteReview");
    expect(response.body.data.content).toEqual("deleteReview")
    expect(response.body.data.score).toEqual(10)
    expect(response.body.data.writer.id).toEqual("helperUser")
    expect(response.body.data.writer.name).toEqual("helperUser")
    expect(response.body.data.game.id).toEqual("helperGame")
    expect(response.body.data.game.name).toEqual("helperGame")
    expect(response.body.data.game.boxart).toEqual("helperGame")
    //reset
    await prisma.game.delete({ where: { id: "helperGame" } })
    await prisma.user.delete({ where: { id: "helperUser" } })
  })
})