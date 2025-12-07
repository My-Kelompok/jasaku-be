import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserRequest, RegisterUserRequest } from 'src/model/auth.model';
import { ApiResponse } from 'src/model/api.model';
import { UserResponse } from 'src/model/users.model';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(200)
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<ApiResponse<UserResponse>> {
    const result = await this.authService.register(request);
    return {
      success: true,
      message: 'User berhasil register!',
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() request: LoginUserRequest,
  ): Promise<ApiResponse<UserResponse>> {
    const result = await this.authService.login(request);
    return {
      success: true,
      message: 'User berhasil login!',
      data: result,
    };
  }
}
