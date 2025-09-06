import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from 'src/nest/auth/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
