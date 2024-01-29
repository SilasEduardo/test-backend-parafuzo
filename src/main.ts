import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Parking')
    .setDescription('parking control')
    .setVersion('1.0')
    .setContact(
      'parking',
      'http://localhost:5000/parking',
      'silasandrade94@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document)

  const port = process.env.SERVER_PORT || 5000;
  Logger.log(`Server listening on port ${port}`);
  await app.listen(port);
  console.info(`Api documentation running on http://localhost:${port}/docs`);
}

bootstrap();
