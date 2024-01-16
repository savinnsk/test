import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/users/repositories/users.repository';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { UserDocument } from '@domain/entities/user/user.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  users: UserDocument[] = [];

  async create(params: {
    user: CreateUserDto;
    id: string;
  }): Promise<UserDocument> {
    const user = {
      ...params.user,
      id: params.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any as UserDocument;
    this.users.push(user);
    return user;
  }

  async findAll() {
    return {
      content: this.users,
    };
  }

  async findById(id: string): Promise<UserDocument> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.users.find((user) => user.email === email);
  }
}
