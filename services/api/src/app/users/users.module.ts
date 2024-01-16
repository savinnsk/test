import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@domain/entities/user/user.schema';
import usecases from './usecases';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule,
  ],
  providers: [...usecases],
  exports: [...usecases],
})
export class UsersModule {}
