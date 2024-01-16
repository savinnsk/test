import { Injectable } from '@nestjs/common';

import { FindUserByEmailService } from '@app/users/usecases/find-user-by-email/find-user-by-email.service';
import { ValidationPasswordService } from '@app/users/usecases/validation-password/validation-password.service';
import { UserDocument } from '@domain/entities/user/user.schema';
import { IValidateUserService } from '@domain/interfaces/validate-user.interface';

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly validationPasswordService: ValidationPasswordService,
  ) {}

  async execute({
    email,
    password,
  }: IValidateUserService): Promise<UserDocument | null> {
    const user = await this.findUserByEmailService.execute(email);
    if (user) {
      const validatedPassword = await this.validationPasswordService.execute({
        user,
        password,
      });
      if (validatedPassword) {
        user.password = undefined;
        return user;
      }
    }
    return null;
  }
}
