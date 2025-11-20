import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrpyt from 'bcrypt';
import { console } from 'inspector';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      !createUserDto.email ||
      !createUserDto.username ||
      !createUserDto.password ||
      !createUserDto.firstName ||
      !createUserDto.lastName
    ) {
      throw new Error('Missing required fields');
    }
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new Error('User with this email already exists');
      }
      if (existingUser.username === createUserDto.username) {
        throw new Error('User with this username already exists');
      }
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrpyt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;
    return result as User;
  }

  async remove(guid: string) {
    return `This action removes a #${guid} user`;
  }
  async findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async findByGuid(guid: string): Promise<User | null> {
    console.log(guid, 'userService');
    return await this.prisma.user.findUnique({
      where: { guid },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
