import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TutorModule } from './tutor/tutor.module';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, TutorModule, ControllerModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
