import config from "config";
import argon2 from "argon2";
import { Logger } from "./logger";

export class PasswordHasher {
    private static readonly ARGON_SALT_LENGTH = config.get('auth.argon.saltLength');
    private static readonly ARGON_HASH_LENGTH = config.get('auth.argon.hashLength');
    private static readonly ARGON_TIME_COST = config.get('auth.argon.timeCost');
    private static readonly ARGON_MEMORY_COST = config.get('auth.argon.memoryCost');
    private static readonly logger: Logger = new Logger();
    
    public static async hashPassword(password: string){
        this.logger.info(`Hashing new password.`)
        return await argon2.hash(password, {
            type: argon2.argon2id,
            saltLength: this.ARGON_SALT_LENGTH,
            hashLength: this.ARGON_HASH_LENGTH,
            timeCost: this.ARGON_TIME_COST,
            memoryCost: this.ARGON_MEMORY_COST,
        });
    }

    public static async verifyPassword(password: string, passwordHash: string){
        this.logger.info(`verifying passwordHash ${passwordHash}.`)
        return await argon2.verify(password, passwordHash, {
            type: argon2.argon2id,
            saltLength: this.ARGON_SALT_LENGTH,
            hashLength: this.ARGON_HASH_LENGTH,
            timeCost: this.ARGON_TIME_COST,
            memoryCost: this.ARGON_MEMORY_COST,
        });
    }
}