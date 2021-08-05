import { ConnectionOptions } from 'typeorm';
import config from './config';

export default {
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPW,
  database: config.dbName,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development' ? true : false,
  entities: [`${__dirname}/**/entities/**/*{.ts,.js}`],
  extra: {
    charset: 'utf8mb4_general_ci',
  },
} as ConnectionOptions;
