import { IsNotEmpty, IsEmail, MinLength, IsEnum } from 'class-validator';
import { ServiceType } from 'generated/prisma/enums';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
