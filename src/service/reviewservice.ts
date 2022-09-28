import { GameRepository } from "../repository/gamerepository";
import { ReviewRepository } from "../repository/reviewrepository";
import { UserRepository } from "../repository/userrepository";
import { Logger } from "../util/logger";

export class NewsService {
private logger = new Logger();
private reviewRepository = new ReviewRepository();
private gameRepository = new GameRepository();
private userRepository = new UserRepository();

}