import supertest from "supertest";
const packageJson = require('../../../../package.json');
const { withServer, LoginAdmin } = require('../../../../config/test/supertest.setup');

describe('game controller tests',()=>{
    let request: supertest.SuperTest<supertest.Test>
    const url = '/api/health';

    withServer(({ prisma: p, supertest:s }) => {
        request = s;
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