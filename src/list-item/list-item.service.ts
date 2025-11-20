import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ListItemService {
  constructor(private prisma: PrismaService) {}

  async create(createListItemDto: CreateListItemDto) {
    const existingList = await this.prisma.listItem.findFirst({
      where: { listGuid: createListItemDto.listGuid },
    });

    if (!existingList) {
      throw new NotFoundException('This list does not exist.');
    }

    const extractedMedia = createListItemDto.mediaType;

    // switch (createListItemDto.mediaType) {
    //   case 'MOVIE':
    //     const media = await
    // }

    // const listItem = await this.prisma.listItem.create({
    //   data:{
    //     listGuid: createListItemDto.listGuid,

    //     }
    //   }
    // })
  }

  // async createMedia(title: string, mediaType): Promise<Partial<Media>> {
  //        await this.prisma.media.create({
  //           data: {
  //             title: title,
  //             mediaType: mediaType
  //           }
  //        })
  // }

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
