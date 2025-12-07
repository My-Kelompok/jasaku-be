import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/common/auth.decorator';
import { User } from 'generated/prisma/client';
import { UpdateUserRequest, UserResponse } from 'src/model/users.model';
import { ApiResponse } from 'src/model/api.model';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Patch()
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Body() request: UpdateUserRequest,
  ): Promise<ApiResponse<UserResponse>> {
    const result = await this.usersService.update(user, request);
    return {
      success: true,
      message: 'User berhasil diupdate!',
      data: result,
    };
  }
}
