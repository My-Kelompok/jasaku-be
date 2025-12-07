import z, { ZodType } from 'zod';

export class UsersValidation {
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    password: z.string().min(6).max(100).optional(),
  });
}
