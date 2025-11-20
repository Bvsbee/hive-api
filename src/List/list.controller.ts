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
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    try {
      return this.listService.create(createListDto);
    } catch (error) {
      throw new HttpException(
        `Failed to create new list: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:userGuid')
  async fetchUserLists(@Param('userGuid') userGuid: string) {
    try {
      return await this.listService.fetchUserLists(userGuid);
    } catch (error) {
      throw new HttpException(
        `Failed to fetch user Lists: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
