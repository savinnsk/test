import { CreateUserService } from './create-user/create-user.service';
import { FindAllUsersService } from './find-all-users/find-all-users.service';
import { FindUserByEmailService } from './find-user-by-email/find-user-by-email.service';
import { FindUserByIdService } from './find-user-by-id/find-user-by-id.service';
import { ValidationPasswordService } from './validation-password/validation-password.service';

export default [
  CreateUserService,
  FindAllUsersService,
  FindUserByIdService,
  FindUserByEmailService,
  ValidationPasswordService,
];
