import { createParamDecorator, ExecutionContext } from '@nestjs/common';

function makeCurrentUserDecorator(data: unknown, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
}

export const CurrentUser = createParamDecorator(makeCurrentUserDecorator);
