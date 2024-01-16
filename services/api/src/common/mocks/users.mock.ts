import { User } from '@domain/entities/user/user.schema';
import { Document, ObjectId } from 'mongoose';

export const createUserMock = {
  name: 'Busca Milhas',
  email: 'contato@buscamilhas.com',
  password: '123456',
};

export const userCreatedMock = {
  name: 'Busca Milhas',
  email: 'contato@buscamilhas.com',
  password: '$2b$10$eZCybxC3f9Pq67GcY2xBJ.7NuQvCVSnGxyIeP.RHCBAFYiCURhMwK',
  _id: 'e2a7876c-5117-44a8-96a7-1c408e9413de',
  createdAt: '2023-03-02T13:56:25.713Z',
  updatedAt: '2023-03-02T13:56:25.713Z',
};

export const usersCreatedMock = [
  {
    name: 'Busca Milhas',
    email: 'contato@buscamilhas.com',
    password: '$2b$10$eZCybxC3f9Pq67GcY2xBJ.7NuQvCVSnGxyIeP.RHCBAFYiCURhMwK',
    _id: 'e2a7876c-5117-44a8-96a7-1c408e9413de',
    createdAt: '2023-03-02T13:56:25.713Z',
    updatedAt: '2023-03-02T13:56:25.713Z',
  },
  {
    name: '123 Milhas',
    email: 'contato@123milhas.com',
    password: '$2b$10$eZCybxC3f9Pq67GcY2xBJ.7NuQvCVSnGxyIeP.RHCBAFYiCURhMwK',
    _id: 'e2a7876c-5117-44a8-96a7-1c408e9413be',
    createdAt: '2023-03-02T13:56:25.713Z',
    updatedAt: '2023-03-02T13:56:25.713Z',
  },
] as any as
  | (Document<unknown, any, User> & User & { _id: ObjectId })[]
  | Promise<(Document<unknown, any, User> & User & { _id: ObjectId })[]>;
