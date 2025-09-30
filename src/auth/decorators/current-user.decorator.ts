import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserType } from '../interfaces/current-user.inteface';

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user: CurrentUserType = request.user;
    return field ? user?.['field'] : user;
  },
);
