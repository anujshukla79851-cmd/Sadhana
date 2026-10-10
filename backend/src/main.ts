 import dns from 'dns';

dns.setServers(['1.1.1.1']);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend ko backend API access karne ki permission
  app.enableCors({
    origin: [process.env.FRONTEND_URL || 'https://anujshukla79851-cmd.github.io', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Hosting ka PORT use hoga, local mein 3000
  const port = process.env.PORT || 3000;

  // Backend ko hosting aur local network interfaces par listen karna
  await app.listen(port, '0.0.0.0');

  console.log(`Sadhana backend is running on port ${port}`);
}

bootstrap();

