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
    const updateData: Partial<UpdateProfileDto> = {};

  // Only add fields that are present in the DTO
  if (dto.firstName) updateData.firstName = dto.firstName;
  if (dto.lastName) updateData.lastName = dto.lastName;
  if (dto.description) updateData.description = dto.description;
  if (dto.subjects) updateData.subjects = dto.subjects;
  if (dto.basePrice) updateData.basePrice = dto.basePrice;

  return this.prisma.profile.update({
    where: { userId: req.user.sub },
    data: updateData,
  });
  }
}
