import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { handlePrismaError } from './prisma-error.handler';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw handlePrismaError(error);
        }
        return throwError(
          () =>
            new InternalServerErrorException('An unexpected error occurred.'),
        );
      }),
    );
  }
}
