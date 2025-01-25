import { IsDateString, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateBookingDto {
    @IsString()
    tutorId: string;
  
    @IsDateString()
    date: string;
  
    @IsDateString()
    startTime: string;
  
    @IsDateString()
    endTime: string;
  
    @IsString()
    subject: string;
  
    @IsNumber()
    @Min(0)
    price: number;
  
    @IsOptional()
    @IsString()
    description?: string;
  }
  
  