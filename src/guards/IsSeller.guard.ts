import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class IsSeller implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    if (role === 'seller') return true;
    return false;
  }
}
