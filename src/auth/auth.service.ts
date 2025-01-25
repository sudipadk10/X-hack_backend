import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { verify, hash } from 'argon2';
import { RegisterDto } from './dto/register-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone ,role:dto.role},
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const verified = await verify(user.password, dto.password);
    if (!verified) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, phone: user.phone ,role:user.role};
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
  async register(dto: RegisterDto) {
    const hashedPassword = await hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        gender: dto.gender,
        password: hashedPassword,
        phone: dto.phone,
        role: dto.role,
        profile: {
          create: {
            firstName: dto.firstName,
            lastName: dto.lastName,
          },
        },
      },
    });
    delete user.password;
    return user;
  }
  logout() {
    return 'User Successfully logged out';
  }
}
