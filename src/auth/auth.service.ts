import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { verify, hash } from 'argon2';
import { RegisterDto } from './dto/register-dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone, role: dto.role },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const verified = await verify(user.password, dto.password);
    if (!verified) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, phone: user.phone, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async register(dto: RegisterDto, cvFile?: Express.Multer.File) {
    try {
      const hashedPassword = await hash(dto.password);

      // Upload CV for tutors if file is provided
      let cvUploadResult = null;

      console.log({ cvFile });
      if (dto.role === 'TUTOR' && cvFile) {
        cvUploadResult = await this.cloudinaryService.uploadFile(cvFile, {
          folder: 'tutor_cvs',
          resource_type: 'raw',
          allowed_formats: ['pdf', 'doc', 'docx'],
        });
      }

      const user = await this.prisma.user.create({
        data: {
          gender: dto.gender,
          password: hashedPassword,
          phone: dto.phone,
          role: dto.role,
          profile:
            dto.role === 'TUTOR'
              ? {
                  create: {
                    fullName: dto.fullName,
                    cv: cvUploadResult?.secure_url,
                    isVerified: false, // Tutors start as unverified
                  },
                }
              : {
                  create: {
                    fullName: dto.fullName,
                    isVerified: true, // Students start as verified
                  },
                },
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Phone already taken.');
        }
      }
    }
  }
  logout() {
    return 'User Successfully logged out';
  }
}
