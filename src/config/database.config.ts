import { registerAs } from '@nestjs/config';

export const DATABASE_CONFIG = registerAs('DB', () => {
  return {
    USERNAME: process.env['DATABASE_USERNAME'] ?? 'test',
    PASSWORD: process.env['DATABASE_PASSWORD'] ?? 'test@123',
    HOST: process.env['DATABASE_HOST'] ?? 'localhost',
    NAME: process.env['DATABASE_NAME'] ?? 'ecommerce_test',
    PORT: process.env['DATABASE_PORT'] ?? 3306,
  };
});
