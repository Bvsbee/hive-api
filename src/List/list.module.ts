import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { UserModule } from 'src/User/user.module';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [UserModule],
})
export class ListModule {}
