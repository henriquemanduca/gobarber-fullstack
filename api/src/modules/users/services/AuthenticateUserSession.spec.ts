import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserSession';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateSession: AuthenticateUserService;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authenticateSession = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Henrique Manduca',
      email: 'henriquemanduca@mail.com',
      password: '123456',
    });

    const response = await authenticateSession.execute({
      email: 'henriquemanduca@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateSession.execute({
        email: 'henriquemanduca@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Henrique Manduca',
      email: 'henriquemanduca@mail.com',
      password: '123456',
    });

    await expect(
      authenticateSession.execute({
        email: 'henriquemanduca@mail.com',
        password: 'xxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
