import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { authConsts } from '@root/backend/auth/consts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Public = (): CustomDecorator<string> => SetMetadata(authConsts.IS_PUBLIC, true);
