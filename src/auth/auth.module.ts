import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config';
import { jwtConstants } from './constants';
import { CloudinaryModule } from 'nestjs-cloudinary';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
    CloudinaryModule.forRoot({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
})  
export class AuthModule {}
