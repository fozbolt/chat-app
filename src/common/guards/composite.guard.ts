import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from '@root/backend/auth/jwtAuth.guard';
import { RolesGuard } from '@root/backend/auth/roles.guard';

@Injectable()
export class CompositeGuard implements CanActivate {
    public constructor(
        private readonly jwtAuthGuard: JwtAuthGuard,
        private readonly rolesGuard: RolesGuard,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        // Apply JwtAuthGuard
        const hasJwtAuthGuardResult = await this.jwtAuthGuard.canActivate(context);
        if (!hasJwtAuthGuardResult) {
            return false;
        }

        // Apply RolesGuard
        return this.rolesGuard.canActivate(context);
    }
}
