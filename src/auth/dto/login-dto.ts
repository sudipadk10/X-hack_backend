import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  role: 'STUDENT' | 'TUTOR';
}
