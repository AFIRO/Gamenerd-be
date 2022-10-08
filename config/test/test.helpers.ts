import supertest from "supertest";
import { TestData } from "../../src/testing/test.data";

export class TestHelpers{ 
public static async loginAdmin(supertest: supertest.SuperTest<supertest.Test>){
	const response = await supertest.post('/api/login')
		.send({
			name: TestData.NAME,
			password: '12345678',
		});

	if (response.status !== 200) {
		throw new Error(response.body.message || 'Unknown error occured');
	}

	return `Bearer ${response.body.token}`;
};

public static async loginWriter(supertest: supertest.SuperTest<supertest.Test>){
	const response = await supertest.post('api/login')
		.send({
			name: "TestWriter",
			password: '12345678',
		});

	if (response.status !== 200) {
		throw new Error(response.body.message || 'Unknown error occured');
	}
  const {user, token} = response.body;
	return `Bearer ${token}`;
};

}