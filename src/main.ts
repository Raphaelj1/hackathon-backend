import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => ({
          property: error.property,
          message: Object.values(error.constraints ?? {}).join(', '),
        }));
        return new BadRequestException(messages);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
