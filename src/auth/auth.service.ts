import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import axios from 'axios';
import authConfig from './config/auth.config';


@Injectable()
export class AuthService {

  @Inject(authConfig.KEY)
  private readonly authConfiguration: ConfigType<typeof authConfig>;

  constructor(private configService: ConfigService) { }

  async githubLogin(code: string) {
    const githubToken = await this.getGithubToken(code);
    return githubToken;
  }

  async githubUser(code: string) {
    const githubUser = await this.getGithubUser(code);
    return githubUser;
  }

  private async getGithubToken(code: string) {
    const url = 'https://github.com/login/oauth/access_token';
    const payload = {
      client_id: this.authConfiguration.github.clientId,
      client_secret: this.authConfiguration.github.clientSecret,
      code,
    };
    const options = { headers: { accept: 'application/json' } };
    const response = await axios.post(url, payload, options);

    return response.data;
  }

  private async getGithubUser(githubToken: string) {
    const url = 'https://api.github.com/user';
    const options = { headers: { authorization: `token ${githubToken}` } };
    const response = await axios.get(url, options);

    return response.data;
  }
}