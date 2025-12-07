import { ServiceType } from "generated/prisma/enums";

export class RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  serviceType: ServiceType;
}

export class UserResponse {
  name: string;
  email: string;
  token?: string;
}

export class LoginUserRequest {
  email: string;
  password: string;
}