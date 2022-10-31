import { UserOutputDto } from "../entity/dto/user/user.output.dto";
import { UserOutputDtoShort } from "../entity/dto/user/user.output.dto.short";
import { UserOutputDtoToken } from "../entity/dto/user/user.output.dto.token";
import { User } from "../entity/user.model";
export class UserMapper {
    public static toOutputDto(user: User): UserOutputDto {
        return new UserOutputDto(user);
    }

    public static toOutputDtoShort(user: User): UserOutputDtoShort {
        return new UserOutputDtoShort(user);
    }

    public static toOutputDtoToken(user: User, token: string): UserOutputDtoToken {
        return new UserOutputDtoToken({ user: this.toOutputDto(user), token: token })
    }
}
