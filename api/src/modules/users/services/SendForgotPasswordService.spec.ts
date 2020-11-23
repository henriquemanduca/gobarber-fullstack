import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordService from './SendForgotPasswordService';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPassword: SendForgotPasswordService;

describe('SendForgotPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPassword = new SendForgotPasswordService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to recorver password by e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    fakeUserRepository.create({
      name: 'Henrique',
      email: 'henriquemanduc@mail.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'henriquemanduc@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recorver password from non existing user', async () => {
    await expect(
      sendForgotPassword.execute({
        email: 'henriquemanduc@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Henrique',
      email: 'henriquemanduc@mail.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'henriquemanduc@mail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
