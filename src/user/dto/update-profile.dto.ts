import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(6)
  description: string;

  @IsString()
  @MinLength(6)
  subjects: string[];

  @IsString()
  @MinLength(6)
  basePrice: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
