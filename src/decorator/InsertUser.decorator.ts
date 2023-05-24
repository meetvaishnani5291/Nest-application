import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InsertUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
