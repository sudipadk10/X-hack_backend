import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TutorModule } from './tutor/tutor.module';
import { RatingModule } from './rating/rating.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, TutorModule, RatingModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
