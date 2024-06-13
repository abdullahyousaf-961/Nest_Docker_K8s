import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigModule global, you don't need to import it in other modules
      envFilePath: '.env', // path to your .env file
    }),
  ],
})
export class AppConfigModule { }