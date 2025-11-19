import { ConflictException, Injectable } from '@nestjs/common';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ListItemService {
  constructor(private prisma: PrismaService) {}

  async create(createListItemDto: CreateListItemDto) {
    const existing = await this.prisma.listItem.findFirst({
      where: { listGuid: createListItemDto.listGuid },
    });

    if (existing) {
      throw new ConflictException(
        'An item for this list already exists.', // clear, API-friendly message
      );
    }

    // const media = await this.prisma.media.create({
    //   data: {

    //   }
    // })

    // const listItem = await this.prisma.listItem.create({
    //   data:{
    //     listGuid: createListItemDto.listGuid,

    //     }
    //   }
    // })
  }

  findAll() {
    return `This action returns all listItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listItem`;
  }

  update(id: number, updateListItemDto: UpdateListItemDto) {
    return `This action updates a #${id} listItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }
}
