import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './User/user.service';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { TmdbModule } from './Tmdb/tmbd.module';
import { TmdbCotnroller } from './Tmdb/tmdb.controller';
import { AniListModule } from './ani-list/ani-list.module';
import { AniListController } from './ani-list/ani-list.controller';
import { BookModule } from './book/book.module';
import { BookController } from './book/book.controller';
import { ListModule } from './list/list.module';
import { ListItemModule } from './list-item/list-item.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    PassportModule,
    TmdbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AniListModule,
    BookModule,
    ListModule,
    ListItemModule,
  ],
  controllers: [
    AppController,
    AuthController,
    TmdbCotnroller,
    AniListController,
    BookController,
  ],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
