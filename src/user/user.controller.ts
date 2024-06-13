import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return user;
  }

  @Post(':userAId/friends/:userBId')
  async addFriend(@Param('userAId') userAId: number, @Param('userBId') userBId: number) {
    await this.userService.addFriend(userAId, userBId);
    return { message: 'Friend added successfully' };
  } 

  @Delete(':userAId/friends/:userBId')
  async removeFriend(@Param('userAId') userAId: number, @Param('userBId') userBId: number) {
    await this.userService.removeFriend(userAId, userBId);
    return { message: 'Friend removed successfully' };
  }

  @Post(':id/like')
  async likeUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    await this.userService.addLike(user);
    return { message: 'User liked successfully' };
  }
}