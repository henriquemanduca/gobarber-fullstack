import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should not be able to update a non-existing profile', async () => {
    expect(
      updateProfile.execute({
        user_id: 'invalid-id',
        name: 'Teste',
        email: 'teste@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henrique@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Henrique Manduca',
      email: 'henriquemanduca@mail.com',
    });

    expect(updatedUser.name).toBe('Henrique Manduca');
    expect(updatedUser.email).toBe('henriquemanduca@mail.com');
  });

  it('Should not be able to use a e-mail already used', async () => {
    await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henrique@mail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henriquemanduca@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Henrique Manduca',
        email: 'henrique@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henrique@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Henrique Manduca',
      email: 'henriquemanduca@mail.com',
      old_password: '123456',
      password: '123456789',
    });

    expect(updatedUser.password).toBe('123456789');
  });

  it('Should not be able to update the password without the old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henrique@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Henrique Manduca',
        email: 'henrique@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password with the wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henrique@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Henrique Manduca',
        email: 'henrique@mail.com',
        old_password: 'wrong_old_password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
