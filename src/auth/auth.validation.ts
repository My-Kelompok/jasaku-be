import { ServiceType } from "generated/prisma/enums";
import z, { ZodType } from "zod";

export class AuthValidation {
  static readonly REGISTER = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(100),
    password: z.string().min(6).max(100),
    serviceType: z.enum(Object.values(ServiceType) as [string, ...string[]]),
  });
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().max(100),
    password: z.string().min(6).max(100),
  });
}