import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('hashPassword')
    private readonly hashPassword: (password: string) => Promise<string>,
    @Inject('comparePassword')
    private readonly comparePassword: (
      password: string,
      encryptedPassword: string,
    ) => Promise<boolean>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (await this.comparePassword(user?.password, password)) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(newUser: CreateUserDTO) {
    const { email, password } = newUser;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser)
      throw new BadRequestException('User with this email already exists');

    const hashedPassword = await this.hashPassword(password);
    newUser = { ...newUser, password: hashedPassword };

    return await this.userService.create(newUser);
  }
}
