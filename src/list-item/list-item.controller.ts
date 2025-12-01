import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';

@Controller('list-item')
export class ListItemController {
  constructor(private readonly listItemService: ListItemService) {}

  @Post()
  create(@Body() createListItemDto: CreateListItemDto) {
    try {
      return this.listItemService.create(createListItemDto);
    } catch (error) {
      throw new HttpException(
        `Failed to add item to list: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  @Get()
  findAll() {
    return this.listItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListItemDto: UpdateListItemDto,
  ) {
    return this.listItemService.update(+id, updateListItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listItemService.remove(+id);
  }
}
