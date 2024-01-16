import { Pix } from '@domain/entities/pix/pix.schema';
import { randomUUID } from 'crypto';

export const pixMock = {
  id: randomUUID(),
  expires_in: new Date().getTime(),
  expires_at: new Date().getTime(),
  qr_code: 'qrcode mocked',
  qr_code_url: ['qrcode mocked'],
} as any as Pix;
