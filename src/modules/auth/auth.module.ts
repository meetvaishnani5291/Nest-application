import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from './helper/encryptPassword.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        secret: 'secret',
        signOptions: { expiresIn: '1d' },
        global: true,
      }),
      inject: [ConfigService],
    }),
    // JwtModule.register({
    //   secret: 'secret',
    //   signOptions: { expiresIn: '1d' },
    //   global: true,
    // }),
  ],
  providers: [
    AuthService,
    // JwtService,
    {
      provide: 'hashPassword',
      useValue: hashPassword,
    },
    {
      provide: 'comparePassword',
      useValue: comparePassword,
    },
  ],
  controllers: [AuthController],
  // exports: [JwtService],
})
export class AuthModule {}
