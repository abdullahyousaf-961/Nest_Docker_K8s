import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('github')
  async githubAuth(@Query('code') code: string) {
    const token = await this.authService.githubLogin(code);
    console.log(token);
    return token;
  }
  @Get('github/user')
  async githubUser(@Query('token') code: string) {
    const user = await this.authService.githubUser(code);
    console.log(user);
    return user;
  }
}