import { ServiceType } from 'generated/prisma/enums';

export class RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  service_type: ServiceType;
}

export class LoginUserRequest {
  email: string;
  password: string;
}
