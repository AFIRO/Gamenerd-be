import { GameOutputDto } from "../entity/dto/game/game.output.dto"
import { UserOutputDtoShort } from "../entity/dto/user/user.output.dto.short"
import { Game } from "../entity/game.model"
import { News } from "../entity/news.model"
import { Review } from "../entity/review.model"
import { User } from "../entity/user.model"


export class TestData{

//primitive values
public static readonly ID = "testId"
public static readonly NAME = "testName"
public static readonly BOXART = "testBoxart"
public static readonly WRITER_ID = "testWriterId" 
public static readonly GAME_ID = "testGameId" 
public static readonly SCORE = 10
public static readonly ROLES = ["ADMIN"]
public static readonly PASSWORD = "testPassword"
public static readonly TOKEN = "testToken"
public static readonly CONTENT = "testContents"

//objects
public static readonly TEST_GAME = new Game({id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART})
public static readonly TEST_GAME_OUTPUT_DTO = new GameOutputDto({id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART})
public static readonly TEST_USER = new User({id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: TestData.ROLES})
public static readonly TEST_USER_SHORT_DTO = new UserOutputDtoShort({id: TestData.ID, name: TestData.NAME})
public static readonly TEST_NEWS = new News({id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID})
public static readonly TEST_REVIEW = new Review({id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID, score: TestData.SCORE})

} 