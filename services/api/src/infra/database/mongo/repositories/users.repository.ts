import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersRepository } from '@app/users/repositories/users.repository';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { User, UserDocument } from '@domain/entities/user/user.schema';
import { PaginationRequest, PaginationResponse } from '@domain/dtos/pagination';

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(params: { user: CreateUserDto }): Promise<UserDocument> {
    return await this.userModel.create(params.user);
  }

  async findAll(params?: PaginationRequest): Promise<PaginationResponse> {
    const total = await this.userModel.countDocuments();

    if (!params.page) {
      params.limit = total;
      params.page = 1;
    }

    const users = await this.userModel
      .find()
      .limit(params.limit * 1)
      .skip((params.page - 1) * params.limit)
      .exec();

    return {
      content: users,
      total_items: total,
      page: params.page,
    };
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }
}
