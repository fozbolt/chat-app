import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { authConsts, Role } from '@root/backend/auth/consts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Public = (): CustomDecorator<string> => SetMetadata(authConsts.IS_PUBLIC, true);
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: Array<Role>): CustomDecorator<string> => SetMetadata(authConsts.ROLES, roles);
