import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;


  @IsString()
  @IsNotEmpty()
  phone: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  role: 'STUDENT' | 'TUTOR';

  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  gender: 'MALE' | 'FEMALE';
}
