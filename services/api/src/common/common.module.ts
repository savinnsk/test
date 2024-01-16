import { Global, Module } from '@nestjs/common';

import { CryptService } from './crypt/crypt.service';
import { HashService } from './hash/hash.service';

@Global()
@Module({
  providers: [CryptService, HashService],
  exports: [CryptService, HashService],
})
export class CommonModule {}
