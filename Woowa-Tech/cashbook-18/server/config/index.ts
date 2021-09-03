import dotenv from 'dotenv';
import path from 'path';
import qs from 'qs';

process.env.NODE_ENV = process.env.NODE_ENV || `development`;

const env = dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '../.env.prod' : '../.env.dev'
  ),
}).parsed;

if (!env) {
  throw new Error('⚠️ .env 파일 설정을 마치셨나요..? ⚠️');
}

const CorsOptions = {
  origin: [env.CORS_CLIENT as string], // 접근 권한을 부여하는 도메인
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

const gitAccessOption = (code: string) => ({
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: env.GITHUB_CLIENT_ID,
    client_secret: env.GITHUB_SECRETS,
    code,
  }),
});

const gitUserOption = (token: string) => ({
  method: 'get',
  headers: {
    'Accept': 'Application/json',
    'Authorization': `token ${token}`,
    'X-OAuth-Scopes': 'user',
    'X-Accepted-OAuth-Scopes': 'user',
  },
});

const setQuery = (state: string) =>
  qs.stringify({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_url: env.REDIRECT_URL,
    state,
    scope: 'user:email',
  });

export default {
  port: parseInt(env.PORT as string, 10),
  dbPort: parseInt(env.DB_PORT as string, 10),
  dbHost: env.DB_HOST,
  dbUser: env.DB_USER,
  dbPW: env.DB_PASSWORD,
  dbName: env.DATABASE,
  api: env.API_BASE as string,
  jwtSecret: env.JWT_SECRET as string,
  RedirectClientUrl: env.REDIRECT_CLIENT_URL as string,
  GithubAuthorize: env.GITHUB_AUTHORIZE as string,
  GithubAccessToken: env.GITHUB_ACCESS_TOKEN as string,
  GithubUser: env.GITHUB_USER as string,
  CorsOptions,
  gitAccessOption,
  gitUserOption,
  setQuery,
};
