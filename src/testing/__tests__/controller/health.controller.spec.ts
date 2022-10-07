import supertest from "supertest";
import { Server } from "../../../server";
const packageJson = require('../../package.json');

describe('game controller tests',()=>{
    let server: Server;
    let request: supertest.SuperTest<supertest.Test>
    const url = '/api/health';

    beforeAll(async () => {
        server = new Server()
        await server.start()
        request = supertest(server.getApplicationContext().callback())
    })

    afterAll(async () => {
        await server.stop();
	});

    it('GET returns 200 and PONG', async () => {
        const response = await request.get(url+"/ping");
        expect(response.status).toBe(200);
        expect(response.body.limit).toBe(100);
        expect(response.body.offset).toBe(0);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toContain({pong: true})
      })

      it('GET returns 200 and info', async () => {
        const response = await request.get(url+"/info");
        expect(response.status).toBe(200);
        expect(response.body.limit).toBe(100);
        expect(response.body.offset).toBe(0);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toContain({
            env: process.env.NODE_ENV,
            version: packageJson.version,
            name: packageJson.name,
          })
      })
})