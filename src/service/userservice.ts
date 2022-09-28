import { UserRepository } from "../repository/userrepository";
import { Logger } from "../util/logger";

export class UserService {
private logger = new Logger();
private userRepository = new UserRepository();
}
