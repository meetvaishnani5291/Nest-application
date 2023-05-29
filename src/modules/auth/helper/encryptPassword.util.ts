import { compare, hash } from 'bcrypt';

export async function hashPassword(password: string) {
  const saltOrRounds = 10;
  const hashedPassword = await hash(password, saltOrRounds);
  return hashedPassword;
}
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await compare(password, hashedPassword);
}
