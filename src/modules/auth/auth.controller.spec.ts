import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto/createUser.dto';
import { LoginUserDTO } from '../user/dto/loginUser.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;

  const MockAuthService = {
    register: jest.fn().mockImplementation(async (user) => {
      return { ...user, id: Date.now() };
    }),
    login: jest.fn().mockImplementation(async (user) => {
      return { access_token: '' };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: MockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('register with new email', async () => {
    const user: CreateUserDTO = {
      name: '',
      email: '',
      password: '',
      role: '',
      address: '',
    };
    expect(controller.register(user)).resolves.toEqual({
      id: expect.any(Number),
      ...user,
    });
  });
  it('register with existing email', async () => {
    const user: CreateUserDTO = {
      name: '',
      email: '',
      password: '',
      role: '',
      address: '',
    };
    const error = new Error('user with this email already exist!');
    MockAuthService.register.mockRejectedValueOnce(error),
      expect(controller.register(user)).rejects.toThrow(error);
  });
  it('login with valid credentianls', async () => {
    const user: LoginUserDTO = {
      email: '',
      password: '',
    };
    return expect(controller.login(user)).resolves.toEqual({
      access_token: expect.any(String),
    });
  });
  it('login with invalid credentianls', async () => {
    const user: LoginUserDTO = {
      email: '',
      password: '',
    };
    const error = new UnauthorizedException();
    MockAuthService.login.mockRejectedValueOnce(error);
    expect(controller.login(user)).rejects.toThrow(error);
  });
});
