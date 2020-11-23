import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Henrique Manduca',
      email: 'henriquemanduca@mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a user with same e-mail than other', async () => {
    await createUser.execute({
      name: 'Henrique Manduca',
      email: 'henriquemanduca@mail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Henrique Silva',
        email: 'henriquemanduca@mail.com',
        password: '456123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
