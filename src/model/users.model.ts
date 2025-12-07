export class UserResponse {
  name: string;
  email: string;
  token?: string;
}

export class UpdateUserRequest {
  name: string;
  password: string;
}
