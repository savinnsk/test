import { randomUUID } from 'crypto';

export const createPaymentsConfigsMock = {
  name: 'pagarme',
  key: 'asdasdasdasd',
};

export const createdPaymentsConfigsMock = {
  id: randomUUID(),
  name: 'pagarme',
  key: 'asdasdasdasd',
  createdAt: new Date(),
  updatedAt: new Date(),
};
