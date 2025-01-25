import { IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateRatingDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    value: number;
  
    @IsOptional()
    @IsString()
    @MaxLength(500)
    comment?: string;
  
    @IsString()
    tutorId: string;
  }