import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';

@Module({
  providers: [TutorService],
  controllers: [TutorController]
})
export class TutorModule {}
