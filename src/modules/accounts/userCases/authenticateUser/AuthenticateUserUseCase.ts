import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }): Promise<IResponse> {
    // Usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, "b44144cbec4be669b5e2b13bcfce12fe", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;

    // Senha está correta
    // Gerar o jsonwebtoken
  }
}

export { AuthenticateUserUseCase };
