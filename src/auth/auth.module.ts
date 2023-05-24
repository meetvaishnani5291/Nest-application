import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from './helper/encryptPassword.util';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule.forRoot()],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '60s' },
    //     global: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
  ],
  providers: [
    AuthService,
    // AuthGuard,
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
  // exports: [AuthGuard],
})
export class AuthModule {}
