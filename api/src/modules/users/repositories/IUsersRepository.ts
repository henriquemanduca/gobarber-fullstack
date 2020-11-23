import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByMail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
