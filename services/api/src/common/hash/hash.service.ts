import { Injectable } from '@nestjs/common';

import { HashingAlgorithm } from '../enums/hash.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
  async hash(
    stringToHash: string,
    algo: HashingAlgorithm = HashingAlgorithm.bcrypt,
  ) {
    if (algo == HashingAlgorithm.bcrypt) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(stringToHash, salt);
    } else if (algo == HashingAlgorithm.sha256) {
      const salt = 'teste';
      return crypto
        .createHash(HashingAlgorithm.sha256)
        .update(`${salt}${stringToHash}`)
        .digest('hex');
    }
  }

  async compare(
    string: string,
    hash: string,
    algo: HashingAlgorithm = HashingAlgorithm.bcrypt,
  ): Promise<boolean> {
    if (algo == HashingAlgorithm.bcrypt) {
      return await bcrypt.compare(string, hash);
    } else if (algo == HashingAlgorithm.sha256) {
      const salt = 'teste';
      return (
        crypto
          .createHash(HashingAlgorithm.sha256)
          .update(`${salt}${string}`)
          .digest('hex') == hash
      );
    }
  }
}
