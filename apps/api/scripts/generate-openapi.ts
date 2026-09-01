import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { createSwaggerDocument } from '../src/swagger';

async function generate() {
  process.env.SKIP_PRISMA_CONNECT = 'true';
  process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@localhost:55432/mangaba_variedades';
  const app = await NestFactory.create(AppModule, {
    logger: false,
    abortOnError: false,
  });
  const document = createSwaggerDocument(app);
  const outputPath = join(__dirname, '..', 'openapi.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  await app.close();
  console.log(`OpenAPI spec written to ${outputPath}`);
}

generate().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
