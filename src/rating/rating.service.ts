import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async rateTutor(studentId: string, dto: CreateRatingDto) {
    // Check if student has interacted with tutor (you'll need to define this logic)
    const hasInteraction = await this.checkStudentTutorInteraction(studentId, dto.tutorId);
    
    if (!hasInteraction) {
      throw new ForbiddenException('You can only rate tutors you have interacted with');
    }

    // Check if student has already rated this tutor
    const existingRating = await this.prisma.rating.findFirst({
      where: {
        tutorId: dto.tutorId,
        studentId: studentId
      }
    });

    if (existingRating) {
      throw new ConflictException('You have already rated this tutor');
    }

    return this.prisma.rating.create({
      data: {
        tutorId: dto.tutorId,
        studentId: studentId,
        value: dto.value,
        comment: dto.comment
      }
    });
  }

  // Implement logic to check student-tutor interaction
  private async checkStudentTutorInteraction(studentId: string, tutorId: string): Promise<boolean> {
    // Example implementation - adjust based on your specific interaction tracking
    const interaction = await this.prisma.booking.findFirst({
      where: {
        studentId: studentId,
        tutorId: tutorId,
        status: 'COMPLETED'
      }
    });

    return !!interaction;
  }

  async getTutorRatings(tutorId: string) {
    const ratings = await this.prisma.rating.findMany({
      where: { tutorId },
      include: {
        student: {
          select: {
            fullName: true
          }
        }
      }
    });

    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length
      : 0;

    return {
      ratings,
      averageRating,
      totalRatings: ratings.length
    };
  }
}
