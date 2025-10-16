import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import "dotenv/config";

interface ISessionUser {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }
    // compare vai comparar a senha que veio com a senha que está no banco de dados
    // se der true as senhas são iguais, se der false as senhas são diferentes
    const passwordConfirmed = await compare(password, user.password);
    // se der true, não entra no if e se der false, entra no if
    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return { user, token };
  }
}
