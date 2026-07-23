import { UserEntity } from "./user.entity";

export class AuthResponseEntity {
  constructor(
    public user: UserEntity,

    public accessToken: string,

    public refreshToken: string,
  ) {}
}
