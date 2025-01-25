import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(studentId: string, dto: CreateBookingDto) {
    // Check tutor availability
    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        tutorId: dto.tutorId,
        date: new Date(dto.date),
        OR: [
          {
            startTime: { lte: new Date(dto.startTime) },
            endTime: { gte: new Date(dto.startTime) }
          },
          {
            startTime: { lte: new Date(dto.endTime) },
            endTime: { gte: new Date(dto.endTime) }
          }
        ]
      }
    });

    if (conflictingBooking) {
      throw new ConflictException('Tutor is not available at this time');
    }

    return this.prisma.booking.create({
      data: {
        studentId,
        tutorId: dto.tutorId,
        date: new Date(dto.date),
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        subject: dto.subject,
        price: dto.price,
        description: dto.description,
        status: 'PENDING'
      }
    });
  }

  async getStudentBookings(studentId: string) {
    return this.prisma.booking.findMany({
      where: { studentId },
      include: {
        tutor: {
          select: {
            fullName: true,
            subject: true
          }
        }
      }
    });
  }

  async getTutorBookings(tutorId: string) {
    return this.prisma.booking.findMany({
      where: { tutorId },
      include: {
        student: {
          select: {
            fullName: true
          }
        }
      }
    });
  }

  async updateBookingStatus(bookingId: string, tutorId: string, dto: UpdateBookingStatusDto) {
    return this.prisma.booking.update({
      where: { 
        id: bookingId,
        tutorId: tutorId 
      },
      data: { status: dto.status }
    });
  }
}
