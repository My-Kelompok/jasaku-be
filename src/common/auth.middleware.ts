import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers['authorization'];

    if (token) {
      const cleanToken = token.replace(/^Bearer\s+/i, '');
      const user = await this.prismaService.user.findFirst({
        where: {
          token: cleanToken,
        },
      });

      if (user) {
        req.user = user;
      }
    }

    next();
  }
}
