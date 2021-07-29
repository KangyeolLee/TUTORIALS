import config from './config';

export default {
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPW,
  database: config.dbName,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/**/models/**/*{.ts,.js}`],
  extra: {
    charset: 'utf8mb4_general_ci',
  },
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
