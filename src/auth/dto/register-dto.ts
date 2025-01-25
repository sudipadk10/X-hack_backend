import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;


  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  cv:string;

  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  role: 'STUDENT' | 'TUTOR';

  @Transform(({ value }) => value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  gender: 'MALE' | 'FEMALE';


}
