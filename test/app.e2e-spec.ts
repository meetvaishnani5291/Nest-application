import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupDB } from './fixtures/setupdb';
import { User } from '../src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import exp from 'constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user = {
    id: null as number,
    name: 'Abhay Padmani',
    email: 'abhay@gmail.com',
    password: 'xyz@123',
    role: 'seller',
    address: 'gujrat india',
  };
  let token: string;
  let product = {
    id: null as number,
    name: 'Iphone 13',
    quantity: 10,
    price: 100000,
  };
  let order = beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await setupDB(moduleFixture);
    await app.init();
  });

  it('/auth/register (POST) -> ', () => {
    const { id: _id, ...newUser } = user;
    const { password, id, ...createdUser } = user;
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(newUser)
      .expect(201)
      .then((response) => {
        user.id = response.body.data.id;
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.objectContaining({
              ...createdUser,
              id: expect.any(Number),
            }),
          }),
        );
      });
  });
  it('/auth/register (POST) -> register with already exist email', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(400);
  });
  it('/auth/register (POST) -> invalid body(role is not passed)', () => {
    const user = {
      name: 'jeel vachhani',
      email: 'jeel@gmail.com',
      password: 'xyz@123',
      address: 'gujrat india',
    };
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(400);
  });
  it('/auth/login (POST) -> ', () => {
    const { password, email, name, id } = user;
    const jwtService = app.get(JwtService);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.objectContaining({
              access_token: expect.any(String),
            }),
          }),
        );
        token = response.body.data.access_token;
        expect(jwtService.verifyAsync(token)).resolves.toEqual(
          expect.objectContaining({
            name,
            id,
          }),
        );
      });
  });
  it('/auth/login (POST) -> invalid password', () => {
    const { password, email, name, id } = user;
    const jwtService = app.get(JwtService);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'wrong password' })
      .expect(401);
  });
  it('/auth/login (POST) -> invalid email', () => {
    const { password } = user;

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'wrong@gmail.com', password })
      .expect(401);
  });
  it('/product/create (POST) -> ', () => {
    const { id: _id, ...newProduct } = product;
    return request(app.getHttpServer())
      .post('/product/create')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct)
      .expect(201)
      .then((response) => {
        product.id = response.body.data.id;
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.objectContaining({
              ...product,
              id: expect.any(Number),
            }),
          }),
        );
      });
  });
  it('/product (GET) -> ', () => {
    return request(app.getHttpServer())
      .get('/product')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                quantity: expect.any(Number),
                price: expect.any(Number),
              }),
            ]),
          }),
        );
      });
  });
  it('/product (GET) -> without passing token', () => {
    return request(app.getHttpServer()).get('/product').expect(403);
  });
  it('/product (GET) -> passing invalid token', () => {
    return request(app.getHttpServer())
      .get('/product')
      .set('Authorization', `Bearer ${token}-invalid`)
      .expect(403);
  });
  // it('/order/create (POST) -> ', () => {
  //   const { id: _id, ...newOrder } = order;
  //   return request(app.getHttpServer())
  //     .post('/order/create')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(newOrder)
  //     .expect(201)
  //     .then((response) => {
  //       order.id = response.body.data.id;
  //       expect(response.body).toEqual(
  //         expect.objectContaining({
  //           success: true,
  //           data: expect.objectContaining({
  //             ...order,
  //             id: expect.any(Number),
  //           }),
  //         }),
  //       );
  //     });
  // });
  it('/order (GET) -> ', () => {
    return request(app.getHttpServer())
      .get('/order')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
