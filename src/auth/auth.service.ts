import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/User/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    if (user?.password !== pass) {
      throw new Error('Invalid password');
    }

    const payload = { sub: user.guid, username: user.username };

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
