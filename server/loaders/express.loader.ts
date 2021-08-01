import express, { NextFunction, Request, Response } from 'express';
import config from '../config';
import routes from '../api';
import cors from 'cors';

const options = {
  origin: ['http://localhost:8080'], // 접근 권한을 부여하는 도메인
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

export default ({ app }: { app: express.Application }) => {
  app.set('port', config.port || 3000);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cors(options));
  app.use(config.api, routes());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Not Found') as any;
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.status || 500).json({
      error: err.mesage,
    });
  });
};
