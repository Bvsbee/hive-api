import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'prisma/prisma.service';
import { List, ListItem, Media } from '@prisma/client';
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
    const user = await this.userService.findByGuid(userGuid);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    const userLists = await this.prisma.list.findMany({
      where: { userGuid: userGuid },
    });

    return userLists;
  }

  async fetchRecentlyAddedMedia(userGuid: string): Promise<ListItem[]> {
    if (!userGuid) {
      throw new NotFoundException('There was no userGuid Provided');
    }

    const recentMedia = await this.prisma.listItem.findMany({
      where: {
        list: {
          userGuid: userGuid,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        media: {
          include: {
            movieDetails: true,
            animeDetails: true,
            tvDetails: true,
            bookDetails: true,
          },
        },
      },
    });

    return recentMedia;
  }

  async fetchItemsPerList(listGuid: string): Promise<Media[]> {
    const list = await this.prisma.list.findFirst({
      where: {
        guid: listGuid,
      },
      include: {
        items: true,
      },
    });

    if (!list) {
      throw new NotFoundException('List was not found');
    }

    const mediaToDisplay = await this.prisma.media.findMany({
      where: {
        listItems: {
          some: {
            listGuid: listGuid,
          },
        },
      },
      include: {
        movieDetails: true,
        animeDetails: true,
        tvDetails: true,
        bookDetails: true,
        listItems: true,
      },
    });

    const cleaned = mediaToDisplay.map((media) => {
      const detail =
        media.movieDetails ||
        media.animeDetails ||
        media.tvDetails ||
        media.bookDetails ||
        null;
    });

    return mediaToDisplay;
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
