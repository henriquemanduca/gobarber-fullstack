import User from '@modules/users/infra/typeorm/entities/User';

interface IUserMapDTO {
  id: string;
  name: string;
  avatar: string;
}

export default class UserMap {
  public static toDTO(user: User): IUserMapDTO {
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };
  }
}
