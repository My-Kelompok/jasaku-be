import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ServiceType } from 'generated/prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
