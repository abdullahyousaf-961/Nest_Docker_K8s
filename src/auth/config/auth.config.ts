import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
}));