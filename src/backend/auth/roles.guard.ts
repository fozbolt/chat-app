import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { authConsts, Role, roleMappings } from '@root/backend/auth/consts';

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(private readonly reflector: Reflector) {}

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Array<Role>>(authConsts.ROLES, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        const userRole = roleMappings[user.roleId as keyof typeof roleMappings];
        if (!userRole) {
            throw new Error("The roleId doesn't exist in mappings");
        }
        return requiredRoles.some((role) => role === userRole);
    }
}
