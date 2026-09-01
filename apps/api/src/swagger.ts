import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { OpenAPIObject } from '@nestjs/swagger';

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Mangaba Variedades API')
    .setDescription('API for Mangaba Variedades with Zod validation and type-safe DTOs')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  return SwaggerModule.createDocument(app, config);
}
