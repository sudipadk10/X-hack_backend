import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getProfile(req) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId: req.user.sub },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
        ratings: true,
      },
    });

    // Exclude sensitive information
    const { user, ...profileData } = profile;
    return {
      ...profileData,
      email: user.email,
      role: user.role,
    };
  }
  async updateProfile(req, dto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { userId: req.user.sub },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        description: dto.description,
        subject: dto.subjects,
        basePrice: dto.basePrice,
      },
    });
  }
}
