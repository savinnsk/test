import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((returnedData: any) => {
        const res = context.switchToHttp().getResponse();

        const statusCode = returnedData?.statusCode
          ? returnedData.statusCode
          : res.statusCode;
        const payload = returnedData?.statusCode
          ? { ...returnedData, status: undefined, statusCode: undefined }
          : returnedData;
        const status = returnedData?.statusCode ? 'REPROVED' : 'APPROVED';

        res.status(statusCode).send({
          status,
          statusCode,
          data: payload,
        });
      }),
    );
  }
}
