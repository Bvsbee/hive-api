import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/User/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
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
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
