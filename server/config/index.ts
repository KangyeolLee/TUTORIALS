import dotenv from 'dotenv';
import qs from 'qs';

process.env.NODE_ENV = process.env.NODE_ENV || `development`;

const env = dotenv.config();
if (env.error) {
  throw new Error('⚠️ .env 파일 설정을 마치셨나요..? ⚠️');
}

const CorsOptions = {
  origin: [process.env.CORS_CLIENT as string], // 접근 권한을 부여하는 도메인
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
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRETS,
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
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_url: process.env.REDIRECT_URL,
    state,
    scope: 'user:email',
  });

export default {
  port: parseInt(process.env.PORT as string, 10),
  dbPort: parseInt(process.env.DB_PORT as string, 10),
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPW: process.env.DB_PASSWORD,
  dbName: process.env.DATABASE,
  api: process.env.API_BASE as string,
  jwtSecret: process.env.JWT_SECRET as string,
  RedirectClientUrl: process.env.REDIRECT_CLIENT_URL as string,
  GithubAuthorize: process.env.GITHUB_AUTHORIZE as string,
  GithubAccessToken: process.env.GITHUB_ACCESS_TOKEN as string,
  GithubUser: process.env.GITHUB_USER as string,
  CorsOptions,
  gitAccessOption,
  gitUserOption,
  setQuery,
};
