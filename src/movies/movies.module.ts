import { MoviesService } from './movies.service';
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
