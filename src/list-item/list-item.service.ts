import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ListItem, Media, MediaType } from '@prisma/client';

@Injectable()
export class ListItemService {
  constructor(private prisma: PrismaService) {}

  async create(listDto: CreateListItemDto): Promise<ListItem> {
    const existingList = await this.prisma.listItem.findFirst({
      where: { listGuid: listDto.listGuid },
    });

    if (!existingList) {
      throw new NotFoundException('This list does not exist.');
    }

    const mediaData = this.createMedia(listDto);

    if (!mediaData) {
      throw new NotFoundException(
        'A List Item can not be created without any Media',
      );
    }

    const listItem = await this.prisma.listItem.create({
      data: {
        listGuid: existingList.guid,
        mediaGuid: (await mediaData).guid,
      },
    });

    return listItem;
  }

  async createMedia(dto: CreateListItemDto): Promise<Media> {
    const data: any = {
      title: dto.title,
      mediaType: dto.mediaType,
    };

    if (dto.movieDetails) {
      data.movieDetails = { create: dto.movieDetails };
    }

    if (dto.tvDetails) {
      data.tvDetails = { create: dto.tvDetails };
    }

    if (dto.bookDetails) {
      data.bookDetails = { create: dto.bookDetails };
    }

    if (dto.animeDetails) {
      data.animeDetails = { create: dto.animeDetails };
    }

    const media = await this.prisma.media.create({
      data: data,
    });

    return media;
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
