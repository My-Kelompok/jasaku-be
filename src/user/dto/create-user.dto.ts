import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ServiceType } from 'generated/prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
