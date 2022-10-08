// import supertest, { Request, Response } from "supertest";
// import { Server } from "../../../server";
// import { Logger } from "../../../util/logger";
// const packageJson = require('../../../../package.json');

// describe('health controller tests',()=>{
//     let request: supertest.SuperTest<supertest.Test>
//     const url = '/api/health';
//     let server;

//     beforeAll(async () =>  {
//     server = new Server()
//     request = supertest(server.getApplicationContext().callback())
  
//   })

//     it('GET returns 200 and PONG', async () => {
//        const response = await request.get(url+"/ping");
//           expect(response.status).toBe(200);
//           expect(response.body).toEqual({pong: true})
//       })

//       it('GET returns 200 and info', async () => {
//         const response = await request.get(url+"/info");
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({
//             env: process.env.NODE_ENV,
//             version: packageJson.version,
//             name: packageJson.name,
//           })
//       })
// })