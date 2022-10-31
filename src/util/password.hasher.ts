import config from "config";
import argon2 from "argon2";
import { Logger } from "./logger";

export class PasswordHasher {
    private ARGON_SALT_LENGTH
    private ARGON_HASH_LENGTH
    private ARGON_TIME_COST
    private ARGON_MEMORY_COST
    private logger: Logger;

    public constructor() {
        this.ARGON_SALT_LENGTH = config.get('auth.argon.saltLength');
        this.ARGON_HASH_LENGTH = config.get('auth.argon.hashLength');
        this.ARGON_TIME_COST = config.get('auth.argon.timeCost');
        this.ARGON_MEMORY_COST = config.get('auth.argon.memoryCost');
        this.logger = new Logger();
    }

    public async hashPassword(password: string) {
        this.logger.info(`Hashing new password.`)
        return await argon2.hash(password, {
            type: argon2.argon2id,
            saltLength: this.ARGON_SALT_LENGTH,
            hashLength: this.ARGON_HASH_LENGTH,
            timeCost: this.ARGON_TIME_COST,
            memoryCost: this.ARGON_MEMORY_COST,
        });
    }

    public async verifyPassword(password: string, passwordHash: string) {
        this.logger.info(`verifying passwordHash ${passwordHash}.`)
        return await argon2.verify(passwordHash, password, {
            type: argon2.argon2id,
            saltLength: this.ARGON_SALT_LENGTH,
            hashLength: this.ARGON_HASH_LENGTH,
            timeCost: this.ARGON_TIME_COST,
            memoryCost: this.ARGON_MEMORY_COST,
        });
    }
}