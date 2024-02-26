import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set the global prefix to 'api' use the setGlobalPrefix() method
  app.setGlobalPrefix('api');
  // enable versioning for the API using the enableVersioning() method
  // use @version() decorator to version the API
  // in controller
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
