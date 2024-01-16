import { Billet } from '@domain/entities/billet/billet.schema';
import { randomUUID } from 'crypto';

export const billetMock = {
  id: randomUUID(),
  barcode: 'asdasdasdasd',
  instructions: 'Instructions mocked',
  due_at: '20-04-2023',
  interest: {
    days: 2,
    type: 'type',
    amount: 3,
  },
  fine: {
    days: 2,
    type: 'type',
    amount: 3,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
} as any as Billet;
