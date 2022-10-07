import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import { Server } from "../../src/server";
import { TestData } from "../../src/testing/test.data";

module.exports.withServer = (setter) => {
	let server:Server;

	beforeAll(async () => {
		server = new Server()

		setter({
			knex: new PrismaClient(),
			supertest: supertest(server.getApplicationContext().callback()),
      server: server
		});
	});

	afterAll(async () => {
		await server.stop();
	});
};

module.exports.loginAdmin = async (supertest) => {
	const response = await supertest.post('/login')
		.send({
			name: TestData.NAME,
			password: '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
		});

	if (response.statusCode !== 200) {
		throw new Error(response.body.message || 'Unknown error occured');
	}

	return `Bearer ${response.body.token}`;
};

module.exports.loginWriter = async (supertest) => {
	const response = await supertest.post('/login')
		.send({
			name: "TestWriter",
			password: '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
		});

	if (response.statusCode !== 200) {
		throw new Error(response.body.message || 'Unknown error occured');
	}

	return `Bearer ${response.body.token}`;
};