import { Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';


@Injectable()
export class RabbitMQService {
  constructor(@Inject('AMQP_CONNECTION') private readonly amqpConnection) {}

  sendEvent(
    exchange: string,
    routingKey: string,
    message: any,
  ): Observable<boolean> {
    const channelWrapper = this.amqpConnection.createChannel({
      json: true,
      setup: (channel: Channel) =>
        channel.assertExchange(exchange, 'backend-test', { durable: true }),
    });

    return new Observable<boolean>((observer) => {
      channelWrapper
        .publish(exchange, routingKey, message)
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
