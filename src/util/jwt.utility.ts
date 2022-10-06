import config from "config";
import jwt from "jsonwebtoken";
import { User } from "../entity/user.model";
import { Logger } from "./logger";

export class JwtHelper {
    private static readonly JWT_AUDIENCE = config.get('auth.jwt.audience');
    private static readonly JWT_SECRET = config.get('auth.jwt.secret');
    private static readonly JWT_ISSUER = config.get('auth.jwt.issuer');
    private static readonly JWT_EXPIRATION_INTERVAL = config.get('auth.jwt.expirationInterval');
    private static readonly logger: Logger = new Logger();

    public static generateJWT(user: User): Promise<string> {
            
        const tokenData = {
            userId: user.id,
            roles: user.roles,
        };
    
        const signOptions = {
            expiresIn: Math.floor(this.JWT_EXPIRATION_INTERVAL / 1000),
            audience: this.JWT_AUDIENCE,
            issuer: this.JWT_ISSUER,
            subject: 'auth',
        };

        return new Promise((resolve, reject) => {
            jwt.sign(
                tokenData, this.JWT_SECRET, signOptions, (err, token) => {
                    if (err) {
                        this.logger.error(`Error while signing new token: ${err.message}`)
                        return reject(err);
                    }
                    this.logger.info(`JWT token ${token} signed succesfully.`)
                    return resolve(token);
                },
            );
        });
    }

    public static verifyJWT(authToken: string): Promise<{userId: string, roles:string[]}> {
        const verifyOptions = {
            audience: this.JWT_AUDIENCE,
            issuer: this.JWT_ISSUER,
            subject: 'auth',
        };
    
        return new Promise((resolve, reject) => {
            jwt.verify(
                authToken, this.JWT_SECRET, verifyOptions, (err, decodedToken) => {
                    if (err || !decodedToken) {
                        this.logger.error(`Error while verifyinf new token: ${err.message}`)
                        return reject(err || new Error('Token could not be parsed'));
                    }
                    this.logger.info(`JWT token containing ${JSON.stringify(decodedToken)} verified succesfully.`)
                    const returnValue = decodedToken as {userId: string, roles:string[]}
                    return resolve(returnValue);
                },
            );
        });
    }
}