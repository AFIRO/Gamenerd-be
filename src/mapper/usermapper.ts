import { UserOutputDto } from "../entity/dto/user/user.output.dto";
import { User } from "../entity/user.model";

export class UserMapper{
    public static toOutputDto(user: User):UserOutputDto {
        return new UserOutputDto(user);
    }

}