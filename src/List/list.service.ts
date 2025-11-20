import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'prisma/prisma.service';
import { List } from '@prisma/client';
import { UserService } from 'src/User/user.service';

@Injectable()
export class ListService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(createListDto: CreateListDto): Promise<List> {
    if (
      !createListDto.userGuid ||
      !createListDto.name ||
      !createListDto.allowedMediaTypes
    ) {
      throw new Error('Missing required fields.');
    }

    const existingList = await this.prisma.list.findFirst({
      where: {
        name: createListDto.name,
        userGuid: createListDto.userGuid,
      },
    });

    if (existingList) {
      throw new Error('List with this name already exists.');
    }

    const list = await this.prisma.list.create({
      data: {
        userGuid: createListDto.userGuid,
        name: createListDto.name,
        icon: createListDto.icon,
      },
    });

    return list as List;
  }

  async fetchUserLists(userGuid: string): Promise<List[]> {
    console.log(userGuid, 'listService');

    const user = await this.userService.findByGuid(userGuid);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    const userLists = await this.prisma.list.findMany({
      where: { userGuid: userGuid },
    });

    return userLists;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
