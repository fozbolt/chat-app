import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { authConsts } from '@root/backend/auth/consts';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public constructor(private readonly reflector: Reflector) {
        super();
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(authConsts.IS_PUBLIC, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const canActivate = await super.canActivate(context);
        if (canActivate) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            request.user = user;
        }

        return canActivate as boolean;
    }
}
