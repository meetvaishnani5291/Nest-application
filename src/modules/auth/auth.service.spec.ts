import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/createUser.dto';

describe('AuthService', () => {
  let service: AuthService;

  const MockHashPassword = jest.fn().mockImplementation(() => {
    return Promise.resolve('hashed_password');
  });
  const MockComparePassword = jest.fn().mockImplementation(() => {
    return Promise.resolve(true);
  });
  const MockJwtService = {
    signAsync: jest.fn(),
  };
  const MockUserService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'hashPassword', useValue: MockHashPassword },
        { provide: 'comparePassword', useValue: MockComparePassword },
        { provide: JwtService, useValue: MockJwtService },
        { provide: UserService, useValue: MockUserService },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('login with valid credentials', async () => {
    const user = {
      id: 1,
      email: '',
      password: '',
      name: '',
    };
    const { email, password } = user;
    MockUserService.findByEmail.mockResolvedValueOnce(user);
    MockJwtService.signAsync.mockResolvedValueOnce('mock_token');

    await expect(service.login(email, password)).resolves.toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
      }),
    );
  });

  it('login with invalid username', async () => {
    const user = {
      id: 1,
      email: '',
      password: '',
      name: '',
    };
    const { email, password } = user;
    MockUserService.findByEmail.mockResolvedValueOnce(null);
    MockJwtService.signAsync.mockResolvedValueOnce('mock_token');

    await expect(service.login(email, password)).rejects.toThrow(
      UnauthorizedException,
    );
  });
  it('login with invalid password', async () => {
    const user = {
      id: 1,
      email: '',
      password: '',
      name: '',
    };
    const { email, password } = user;
    MockUserService.findByEmail.mockResolvedValueOnce(user);
    MockJwtService.signAsync.mockResolvedValueOnce('mock_token');
    MockComparePassword.mockResolvedValueOnce(false);

    await expect(service.login(email, password)).rejects.toThrow(
      UnauthorizedException,
    );
  });
  it('register with new email', async () => {
    const user: CreateUserDTO = {
      email: '',
      password: '',
      name: '',
      role: '',
      address: '',
    };
    const createdUser = {
      ...user,
      id: Date.now(),
    };
    const { email, password } = user;
    MockUserService.findByEmail.mockResolvedValueOnce(null);
    MockUserService.create.mockResolvedValueOnce(createdUser);

    await expect(service.register(user)).resolves.toBe(createdUser);
  });
  it('register with existing email', async () => {
    const user: CreateUserDTO = {
      email: '',
      password: '',
      name: '',
      role: '',
      address: '',
    };
    const createdUser = {
      ...user,
      id: Date.now(),
    };
    MockUserService.findByEmail.mockResolvedValueOnce(createdUser);
    MockUserService.create.mockResolvedValueOnce(createdUser);

    await expect(service.register(user)).rejects.toThrow(BadRequestException);
  });
});
