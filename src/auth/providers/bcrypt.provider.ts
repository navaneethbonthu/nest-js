import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    let salt = await bcrypt.salt();

    return await bcrypt.hashedPassword(data, salt);
  }

  public async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<Boolean> {
    return await bcrypt.comparePassword(plainPassword, hashedPassword);
  }
}
