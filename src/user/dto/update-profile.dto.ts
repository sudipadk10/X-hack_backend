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
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
