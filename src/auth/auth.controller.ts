import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { RegisterDto } from './dto/register-dto';
import { AuthGuard } from './guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
@UseInterceptors(FileInterceptor('cv'))
async register(
  @Body() dto: RegisterDto,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /(pdf|doc|docx)$/ }),
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }) // 5MB
      ],
      fileIsRequired: false 
    })
  ) cv?: Express.Multer.File
) {
  console.log({cv})
  // Explicit validation for tutors
  if (dto.role === 'TUTOR' && !cv) {
    throw new BadRequestException('CV is required for tutors');
  }

  return this.authService.register(dto, cv);
}
  @UseGuards(AuthGuard)
  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
