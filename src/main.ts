import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { INestApplication } from '@nestjs/common';

dotenv.config();

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const port: string = process.env.PORT ?? '3000';
  app.enableCors();
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap the app', err);
});
