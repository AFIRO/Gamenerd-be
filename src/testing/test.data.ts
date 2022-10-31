import { GameCreateDto } from "../entity/dto/game/game.create.dto"
import { GameOutputDto } from "../entity/dto/game/game.output.dto"
import { GameUpdateDto } from "../entity/dto/game/game.update.dto"
import { LoginDataDto } from "../entity/dto/login/login.data.dto"
import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsOutputDto } from "../entity/dto/news/news.output.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { ReviewCreateDto } from "../entity/dto/review/review.create.dto"
import { ReviewOutputDto } from "../entity/dto/review/review.output.dto"
import { ReviewUpdateDto } from "../entity/dto/review/review.update.dto"
import { UserCreateDto } from "../entity/dto/user/user.create.dto"
import { UserOutputDto } from "../entity/dto/user/user.output.dto"
import { UserOutputDtoShort } from "../entity/dto/user/user.output.dto.short"
import { UserOutputDtoToken } from "../entity/dto/user/user.output.dto.token"
import { UserRegisterDto } from "../entity/dto/user/user.register.dto"
import { UserUpdateDto } from "../entity/dto/user/user.update.dto"
import { Game } from "../entity/game.model"
import { News } from "../entity/news.model"
import { Review } from "../entity/review.model"
import { User } from "../entity/user.model"


export class TestData {

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
  public static readonly AUTH_HEADER = "Bearer THIS_IS_A_TEST_HEADER"

  //objects
  //game
  public static readonly TEST_GAME = new Game({ id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART })
  public static readonly TEST_GAME_CREATE_DTO = new GameCreateDto({ name: TestData.NAME, boxart: TestData.BOXART })
  public static readonly TEST_GAME_UPDATE_DTO = new GameUpdateDto({ id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART })
  public static readonly TEST_GAME_OUTPUT_DTO = new GameOutputDto({ id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART })

  //user
  public static readonly TEST_USER = new User({ id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: TestData.ROLES })
  public static readonly TEST_USER_NO_ADMIN = new User({ id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: [] })
  public static readonly TEST_USER_OUTPUT_DTO = new UserOutputDto({ id: TestData.ID, name: TestData.NAME, roles: TestData.ROLES })
  public static readonly TEST_USER_OUTPUT_DTO_NO_ADMIN = new UserOutputDto({ id: TestData.ID, name: TestData.NAME, roles: [] })
  public static readonly TEST_USER_UPDATE_DTO = new UserUpdateDto({ id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: TestData.ROLES })
  public static readonly TEST_USER_CREATE_DTO = new UserCreateDto({ name: TestData.NAME, password: TestData.PASSWORD, roles: TestData.ROLES })
  public static readonly TEST_USER_CREATE_DTO_NO_ADMIN = new UserCreateDto({ name: TestData.NAME, password: TestData.PASSWORD, roles: [] })
  public static readonly TEST_USER_REGISTER_DTO = new UserRegisterDto({ name: TestData.NAME, password: TestData.PASSWORD })
  public static readonly TEST_USER_SHORT_DTO = new UserOutputDtoShort({ id: TestData.ID, name: TestData.NAME })
  public static readonly TEST_USER_TOKEN_DTO = new UserOutputDtoToken({ user: TestData.TEST_USER_OUTPUT_DTO, token: TestData.TOKEN })
  public static readonly TEST_USER_TOKEN_DTO_NO_ADMIN = new UserOutputDtoToken({ user: TestData.TEST_USER_OUTPUT_DTO_NO_ADMIN, token: TestData.TOKEN })

  //news
  public static readonly TEST_NEWS = new News({ id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID })
  public static readonly TEST_NEWS_OUTPUT_DTO = new NewsOutputDto({ id: TestData.ID, content: TestData.CONTENT, game: TestData.TEST_GAME_OUTPUT_DTO, writer: TestData.TEST_USER_SHORT_DTO })
  public static readonly TEST_NEWS_CREATE_DTO = new NewsCreateDto({ content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID })
  public static readonly TEST_NEWS_UPDATE_DTO = new NewsUpdateDto({ id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID })

  //game
  public static readonly TEST_REVIEW = new Review({ id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID, score: TestData.SCORE })
  public static readonly TEST_REVIEW_OUTPUT_DTO = new ReviewOutputDto({ id: TestData.ID, content: TestData.CONTENT, score: TestData.SCORE, game: TestData.TEST_GAME_OUTPUT_DTO, writer: TestData.TEST_USER_SHORT_DTO })
  public static readonly TEST_REVIEW_CREATE_DTO = new ReviewCreateDto({ content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID, score: TestData.SCORE })
  public static readonly TEST_REVIEW_UPDATE_DTO = new ReviewUpdateDto({ id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID, score: TestData.SCORE })
  public static readonly TEST_LOGIN_DATA_DTO = new LoginDataDto({ name: TestData.NAME, password: TestData.PASSWORD })

  //objects for setup
  public static readonly testReview = { id: TestData.ID, content: TestData.CONTENT, writerId: TestData.ID, gameId: TestData.ID, score: TestData.SCORE }
  public static readonly testNews = { id: TestData.ID, content: TestData.CONTENT, writerId: TestData.ID, gameId: TestData.ID }

  //prisma inputs
  public static readonly PRISMA_USER =
    {
      id: TestData.ID,
      name: TestData.NAME,
      roles: {
        connect: [{ name: "ADMIN" }]
      },
      password: "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU"
    }


  public static readonly PRISMA_USER_WRITER =
    {
      id: "TestWriter",
      name: "TestWriter",
      roles: {
        connect: [{ name: "WRITER" }]
      },
      password: "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU"
    }

}