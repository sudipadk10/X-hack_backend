import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';

@Module({
  providers: [RatingService],
  controllers: [RatingController]
})
export class RatingModule {}
