import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { hashPassword, comparePassword } from 'src/common/utils/bcrypt.util';
import { generateToken } from 'src/common/utils/token.util';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterDto) {
    const hashed = await hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashed,
      },
      select: {
        id: true,
        name: true,
        email: true,
        serviceType: true,
        createdAt: true,
      },
    });
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const match = await comparePassword(data.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = generateToken();

    await this.prisma.token.create({
      data: {
        token,
        userId: user.id,
      },
    });

    return { token };
  }

  async validateToken(token: string) {
    return this.prisma.token.findUnique({
      where: { token },
      include: { user: true },
    });
  }
}
