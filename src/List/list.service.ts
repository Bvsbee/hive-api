import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'prisma/prisma.service';
import { List } from '@prisma/client';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(createListDto: CreateListDto) {
    if (!createListDto.userGuid || !createListDto.name) {
      throw new Error('Missing required fields.');
    }

    const existingList = await this.prisma.list.findFirst({
      where: { name: createListDto.name },
    });

    if (existingList) {
      throw new Error('List with this name already exists.');
    }

    const list = await this.prisma.list.create({
      data: {
        userGuid: createListDto.userGuid,
        name: createListDto.name,
        items: {},
      },
    });

    return list as List;
  }

  findAll() {
    return `This action returns all list`;
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
