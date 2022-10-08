import supertest from 'supertest';
import { PrismaClient } from "@prisma/client";
import { TestData } from "../../test.data";
import { Server } from '../../../server';

describe('review controller tests', () => {
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

  it('GET returns 200 and all items', async () => {
    const response = await request.get(url).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
  })

  it('GET by writer returns 200 and correct items', async () => {
    const response = await request.get(url+ "/byWriter/" + TestData.ID).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
  })

  it('GET by game returns 200 and correct items', async () => {
    const response = await request.get(url+ "/byGame/" + TestData.ID).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.data).toContainEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
  })

  it('GET by id returns 200 and specific item', async () => {
    const response = await request.get(url + "/" + TestData.ID).set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(TestData.TEST_REVIEW_OUTPUT_DTO)
  })

  it('POST returns 201 and created item', async () => {
    await prisma.game.create({ data: { id: "helperReviewGame", name: "helperReviewGame", boxart: "helperReviewGame" } })
    await prisma.user.create({
      data: {
        id: "helperReviewUser",
        name: "helperReviewUser",
        roles: {
          connect: [{ name: "ADMIN" }]
        },
        password: "helperReviewUser"
      }
    })
    const response = await request.post(url).send({ content: "createReview", writerId: "helperReviewUser", gameId: "helperReviewGame", score: 10 }).set("Authorization", await getWriterToken());
    expect(response.status).toBe(201);
    expect(response.body.data.content).toEqual("createReview")
    expect(response.body.data.score).toEqual(10)
    expect(response.body.data.writer.id).toEqual("helperReviewUser")
    expect(response.body.data.writer.name).toEqual("helperReviewUser")
    expect(response.body.data.game.id).toEqual("helperReviewGame")
    expect(response.body.data.game.name).toEqual("helperReviewGame")
    expect(response.body.data.game.boxart).toEqual("helperReviewGame")
    //reset
    await prisma.review.delete({ where: { content: "createReview" } })
    await prisma.game.delete({ where: { id: "helperReviewGame" } })
    await prisma.user.delete({ where: { id: "helperReviewUser" } })
  })

  it('PUT returns 200 and update item', async () => {
    await prisma.game.create({ data: { id: "helperReviewGame", name: "helperReviewGame", boxart: "helperReviewGame" } })
    await prisma.user.create({
      data: {
        id: "helperReviewUser",
        name: "helperReviewUser",
        roles: {
          connect: [{ name: "ADMIN" }]
        },
        password: "helperReviewUser"
      }
    })
    await prisma.review.create({ data: { id: "updateReview", content: "content", writerId: "helperReviewUser", gameId: "helperReviewGame", score: 10 } })
    const gewijzigdeData = { id: "updateReview", content: "gewijzigdeContent", writerId: "helperReviewUser", gameId: "helperReviewGame", score: 10 }
    const response = await request.put(url + "/updateReview").send(gewijzigdeData).set("Authorization", await getWriterToken());
    expect(response.status).toBe(200);
    expect(response.body.data.id).toEqual("updateReview");
    expect(response.body.data.content).toEqual("gewijzigdeContent")
    expect(response.body.data.score).toEqual(10)
    expect(response.body.data.writer.id).toEqual("helperReviewUser")
    expect(response.body.data.writer.name).toEqual("helperReviewUser")
    expect(response.body.data.game.id).toEqual("helperReviewGame")
    expect(response.body.data.game.name).toEqual("helperReviewGame")
    expect(response.body.data.game.boxart).toEqual("helperReviewGame")
    //reset
    await prisma.review.delete({ where: { id: "updateReview" } })
    await prisma.game.delete({ where: { id: "helperReviewGame" } })
    await prisma.user.delete({ where: { id: "helperReviewUser" } })
  })

  it('DELETE by id returns 200 and specific item', async () => {
    await prisma.game.create({ data: { id: "helperReviewGame", name: "helperReviewGame", boxart: "helperReviewGame" } })
    await prisma.user.create({
      data: {
        id: "helperReviewUser",
        name: "helperReviewUser",
        roles: {
          connect: [{ name: "ADMIN" }]
        },
        password: "helperReviewUser"
      }
    })
    await prisma.review.create({ data: { id: "deleteReview", content: "deleteReview", writerId: "helperReviewUser", gameId: "helperReviewGame", score: 10 } })
    const response = await request.delete(url + "/deleteReview").set("Authorization", await getAdminToken());
    expect(response.status).toBe(200);
    expect(response.body.data.id).toEqual("deleteReview");
    expect(response.body.data.content).toEqual("deleteReview")
    expect(response.body.data.score).toEqual(10)
    expect(response.body.data.writer.id).toEqual("helperReviewUser")
    expect(response.body.data.writer.name).toEqual("helperReviewUser")
    expect(response.body.data.game.id).toEqual("helperReviewGame")
    expect(response.body.data.game.name).toEqual("helperReviewGame")
    expect(response.body.data.game.boxart).toEqual("helperReviewGame")
    //reset
    await prisma.game.delete({ where: { id: "helperReviewGame" } })
    await prisma.user.delete({ where: { id: "helperReviewUser" } })
  })

  it('GET all returns 400 with bad credentials', async () => {
    const response = await request.get(url);
    expect(response.status).toBe(400);
  })

  it('GET all by writer returns 400 with bad credentials', async () => {
    const response = await request.get(url+"/byWriter/"+TestData.ID);
    expect(response.status).toBe(400);
  })

  it('GET all by game returns 400 with bad credentials', async () => {
    const response = await request.get(url+"/byWriter/"+TestData.ID);
    expect(response.status).toBe(400);
  })


  it('GET by id returns 400 with bad credentials', async () => {
    const response = await request.get(url+"/"+TestData.ID);
    expect(response.status).toBe(400);
  })

  it('POST returns 400 with invalid data', async () => {
    const response = await request.post(url).send({}).set("Authorization", await getWriterToken());
    expect(response.status).toBe(400);
  })

  it('POST returns 400 with bad credentials', async () => {
    const response = await request.post(url).send({ content: "createReview", writerId: "helperReviewUser", gameId: "helperReviewGame", score: 10 });
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 with invalid data', async () => {
    const response = await request.put(url + "/updateReview").send({}).set("Authorization", await getWriterToken());
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 with bad credentials', async () => {
    const response = await request.put(url + "/updateReview").send({ content: "createReview", writerId: "helperReviewUser", gameId: "helperReviewGame", score: 10 });
    expect(response.status).toBe(400);
  })

  it('PUT returns 400 when id in url and dto do not match', async () => {
    const data = { id: "WRONG", content: "gewijzigdeContent", writerId: "helperReviewUser", gameId: "helperReviewGame", score: 10 }
    const response = await request.put(url + "/updateReview").send(data).set("Authorization", await getWriterToken());
    expect(response.status).toBe(400);
  })

  it('DELETE by id returns 400 with bad credentials', async () => {
    const response = await request.delete(url + "/deleteReview");
    expect(response.status).toBe(400);
  })
})