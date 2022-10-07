import supertest from "supertest";
import { TestData } from "../../src/testing/test.data";

export class TestHelpers{ 
public static async loginAdmin(supertest: supertest.SuperTest<supertest.Test>){
	const response = await supertest.post('/login')
		.send({
			name: TestData.NAME,
			password: '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
		});

	if (response.status !== 200) {
		throw new Error(response.body.message || 'Unknown error occured');
	}

	return `Bearer ${response.body.token}`;
};

// public static async loginWriter(supertest: supertest.SuperTest<supertest.Test>){
// 	const response = await supertest.post('/login')
// 		.send({
// 			name: "TestWriter",
// 			password: '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
// 		});

// 	if (response.status !== 200) {
// 		throw new Error(response.body.message || 'Unknown error occured');
// 	}

// 	return `Bearer ${response.body.token}`;
// };

}