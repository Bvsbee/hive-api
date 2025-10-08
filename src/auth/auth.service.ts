import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/User/user.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByUsername(signInDto.username);
    if (!user) {
      throw new Error('User not found');
    }

    console.log('Passwords:', signInDto);

    if (user?.password !== signInDto.password) {
      throw new Error('Invalid password');
    }

    const payload = { sub: user.guid, username: user.username };

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }
}
