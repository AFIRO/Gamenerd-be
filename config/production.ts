module.exports = {
	log: {
		level: 'info',
		disabled: false,
	},
	cors: {
		origins: "http://localhost:3000",
		maxAge: 3 * 60 * 60,
	},
	environment: 'production',
	port:9000,
	auth: {
		argon: {
			saltLength: 16,
			hashLength: 32,
			timeCost: 6,
			memoryCost: 2 ** 17,
		},
		jwt: {
			secret: 'macaronimetkaasalsothegame',
			expirationInterval: 60 * 60 * 1000, 
			issuer: 'game.nerd.be',
			audience: 'game.nerd.be',
		}
  }
};