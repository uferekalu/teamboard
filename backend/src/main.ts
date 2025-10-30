import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  // Apply Helmet for security headers
  app.use(
    helmet({
      frameguard: { action: 'deny' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameAncestors: ["'none'"],
        },
      },
    }),
  );

  // Enable CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Apply validation globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Teamboard API')
    .setDescription('Intuitive API for Lightweight Work Management Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Endpoints related to authentication')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();