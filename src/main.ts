import { CallHandler, ClassSerializerInterceptor, ExecutionContext, NestInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Observable, of, switchMap } from 'rxjs';
import { AppModule } from './app.module';


async function dinning() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  await app.listen(3000);
}

dinning();
