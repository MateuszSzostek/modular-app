import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from '../services/access-control.service';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly usersService: UserService,
    private readonly reflector: Reflector,
    private readonly accessControlService: AccessControlService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const action = this.reflector.get<string>('action', context.getHandler());
    if (!action) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const profileId = request.params.profileId;

    if (!user || !profileId) return false;

    const currentUser = await this.usersService?.getUserById(user?._id);

    const isOwner = currentUser?.profiles?.includes(profileId);

    if (isOwner) return true;

    const permissions = await this.accessControlService.getAccessData(
      user.id,
      profileId,
    );
    return permissions.includes(action);
  }
}
