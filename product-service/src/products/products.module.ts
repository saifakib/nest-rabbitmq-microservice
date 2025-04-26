import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './product.entity';
import { ProductSchema } from './product.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const rabbitUrl = configService.get<string>('RABBITMQ_URL');
          const queueName = configService.get<string>('RABBITMQ_AUTH_QUEUE');

          if (!rabbitUrl || !queueName) {
            throw new Error('Missing RABBITMQ_URL or RABBITMQ_AUTH_QUEUE in environment variables');
          }

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitUrl],
              queue: queueName,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
      {
        name: 'PRODUCT_SERVICE_USER_EVENTS',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const rabbitUrl = configService.get<string>('RABBITMQ_URL');

          if (!rabbitUrl) {
            throw new Error('Missing RABBITMQ_URL in environment variables');
          }

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitUrl],
              queue: 'product_service_user_events_queue',
              queueOptions: {
                durable: false,
              },
              exchange: 'user.events',
              routingKey: 'user.created',
              exchangeType: 'fanout',
            },
          };
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
