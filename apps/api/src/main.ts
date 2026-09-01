import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { loadEnv } from './load-env';

async function bootstrap() {
  loadEnv();

  const app = await NestFactory.create(AppModule);

  // Enable global validation with Zod
  app.useGlobalPipes(new ZodValidationPipe());

  // Configure Swagger - nestjs-zod DTOs automatically integrate with Swagger
  const document = createSwaggerDocument(app);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: 'http://localhost:3000' });
  await app.listen(process.env.PORT ?? 3001);

  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3001}`,
  );
  console.log(
    `Swagger documentation: http://localhost:${process.env.PORT ?? 3001}/api`,
  );
}
bootstrap();
