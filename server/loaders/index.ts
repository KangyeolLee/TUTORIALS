import express from 'express';
import expressLoader from './express.loader';
import databaseLoader from './database.loader';

export default async ({ app }: { app: express.Application }) => {
  try {
    await databaseLoader.connect();
    await expressLoader({ app });
  } catch (error) {
    throw new Error('[로더 에러] : ' + error);
  }
};
