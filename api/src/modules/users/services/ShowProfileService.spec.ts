import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('Should be able to show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henrique@mail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Henrique');
    expect(profile.email).toBe('henrique@mail.com');
  });

  it('Should not be able to show a non-existing profile', async () => {
    expect(
      showProfile.execute({ user_id: 'invalid-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
