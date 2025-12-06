import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  raw: string,
  hashed: string,
): Promise<boolean> => {
  return bcrypt.compare(raw, hashed);
};
