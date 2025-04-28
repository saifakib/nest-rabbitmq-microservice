import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsHandler {
  constructor() {}

  @EventPattern('user.created')
  async handleUserCreated(
    @Payload() data: { userId: string; email: string; name: string },
  ) {
    console.log('Received user.created event in Product Service:', data);
  }
}
