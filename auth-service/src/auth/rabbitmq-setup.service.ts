import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqSetupService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const rabbitmqUrl = this.configService.getOrThrow<string>('rabbitmqUrl');
    const exchange = this.configService.getOrThrow<string>(
      'rabbitmqUserCreatedExchange',
    );
    const queue = 'user_events_queue';
    const routingKey = this.configService.getOrThrow<string>(
      'rabbitmqUserCreatedRoutingKey',
    );

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'topic', { durable: true });
    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, exchange, routingKey);

    console.log('[RabbitMQ Setup] Exchange, Queue and Binding are ready ✅');

    await channel.close();
    await connection.close();
  }
}
