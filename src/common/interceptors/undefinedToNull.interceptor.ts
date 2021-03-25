import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 컨트롤러 요청 전 로직
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}

// Controller 앞과 뒤에 Intercept 하여 로직 실행 (AOP Concept)
