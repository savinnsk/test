import { AuthorizeDto } from '../authorize.dto';

export class CreateTransactionDto extends AuthorizeDto {
  createdAt?: Date;
  updatedAt?: Date;
}
