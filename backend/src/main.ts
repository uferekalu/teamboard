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

  // Helmet for security
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

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',             
      'https://teamboard-frontend.vercel.app', 
    ],
    credentials: true,
  });

  // Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

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

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
