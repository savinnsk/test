import { CreateClientDto } from '@domain/dtos/client/create-client.dto';
import mongoose from 'mongoose';

export const createClientMock = {
  name: 'Busca Milhas',
  apiKey: 'asdasdasdasdasdasdasd',
  paymentsConfigs: [
    {
      name: 'pagarme',
      key: 'pagarme-fake-key',
    },
  ],
} as CreateClientDto & { apiKey: string };

export const createdClient = {
  ...createClientMock,
  apiKey: 'asdasd',
  id: new mongoose.Types.ObjectId(),
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;
