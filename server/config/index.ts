import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || `development`;

const env = dotenv.config();
if (env.error) {
  throw new Error('⚠️ .env 파일 설정을 마치셨나요..? ⚠️');
}

export default {
  port: parseInt(process.env.PORT!, 10),
  dbPort: parseInt(process.env.DB_PORT!, 10),
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPW: process.env.DB_PASSWORD,
  dbName: process.env.DATABASE,
  api: process.env.API_BASE,
  jwtSecret: process.env.JWT_SECRET,
};
