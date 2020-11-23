import path from 'path';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private tokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const userExist = await this.userRepository.findByMail(email);

    if (!userExist) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.tokensRepository.generate(userExist.id);

    const forgotPassword = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: userExist.name,
        email: userExist.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPassword,
        variables: {
          name: userExist.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
