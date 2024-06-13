import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Event])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
