import { ServiceType } from 'generated/prisma/enums';

export class UserResponse {
  name: string;
  email: string;
  service_type?: ServiceType;
  token?: string;
}

export class UpdateUserRequest {
  name: string;
  password: string;
}
