import { IsEnum } from "class-validator";
enum BookingStatus {
    PENDING,
    CONFIRMED,
    COMPLETED,
    CANCELLED
  }

export class UpdateBookingStatusDto {
    @IsEnum(BookingStatus)
    status: BookingStatus;
  }