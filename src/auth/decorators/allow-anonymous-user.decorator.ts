import { SetMetadata } from '@nestjs/common';

export const AllowAnonymousUser = () => {
  return SetMetadata('isPublic', true);
};
