import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUserRequest, RegisterUserRequest } from 'src/model/auth.model';
import { ValidationService } from 'src/common/validation.service';
import { AuthValidation } from './auth.validation';
import { comparePassword, hashPassword } from 'src/common/utils/bcrypt.util';
import { generateToken } from 'src/common/utils/token.util';
import { UserResponse } from 'src/model/users.model';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    const registerRequest = this.validationService.validate(
      AuthValidation.REGISTER,
      request,
    ) as RegisterUserRequest;

    const totalUserWithSameEmail = await this.prismaService.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new HttpException('Email already registered', 400);
    }

    registerRequest.password = await hashPassword(registerRequest.password);

    const user = await this.prismaService.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: registerRequest.password,
        serviceType: registerRequest.service_type,
      },
    });

    return {
      email: user.email,
      name: user.name,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = this.validationService.validate(
      AuthValidation.LOGIN,
      request,
    ) as LoginUserRequest;

    let user = await this.prismaService.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new HttpException('Email or password is invalid', 401);
    }

    const isPasswordValid = await comparePassword(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Email or password is invalid', 401);
    }

    user = await this.prismaService.user.update({
      where: {
        email: loginRequest.email,
      },
      data: {
        token: generateToken(),
      },
    });

    return {
      email: user.email,
      name: user.name,
      token: user.token!,
    };
  }
}
