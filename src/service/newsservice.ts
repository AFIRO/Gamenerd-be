import { GameRepository } from "../repository/gamerepository";
import { NewsRepository } from "../repository/newsrepository";
import { UserRepository } from "../repository/userrepository";
import { Logger } from "../util/logger";

export class NewsService {
private logger = new Logger();
private newsRepository = new NewsRepository();
private gameRepository = new GameRepository();
private userRepository = new UserRepository();

}