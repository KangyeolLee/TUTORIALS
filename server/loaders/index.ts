import express from 'express';
import expressLoader from './express.loader';

export default async ({ app }: { app: express.Application }) => {
  await expressLoader({ app });
};
