import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles, RolesGuard } from 'src/auth/guards/role.guard';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto';

@Controller('booking')

export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('STUDENT')
  createBooking(
    @Req() req,
    @Body() createBookingDto: CreateBookingDto
  ) {
    return this.bookingService.createBooking(req.user.id, createBookingDto);
  }

  @Get('student')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('STUDENT')
  getStudentBookings(@Req() req) {
    return this.bookingService.getStudentBookings(req.user.id);
  }

  @Get('tutor')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('TUTOR')
  getTutorBookings(@Req() req) {
    return this.bookingService.getTutorBookings(req.user.id);
  }

  @Patch(':bookingId/status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('TUTOR')
  updateBookingStatus(
    @Req() req,
    @Param('bookingId') bookingId: string,
    @Body() updateStatusDto: UpdateBookingStatusDto
  ) {
    return this.bookingService.updateBookingStatus(
      bookingId, 
      req.user.id, 
      updateStatusDto
    );
  }
}