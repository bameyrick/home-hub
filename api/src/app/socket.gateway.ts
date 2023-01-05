import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { isEqual } from '@qntm-code/utils';
import { Server } from 'http';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { Socket } from 'socket.io';
import { CalDavService } from '../caldav/caldav.service';
import { WeatherService } from '../weather/weather.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server?: Server;

  private readonly clients: Record<string, Subscription> = {};

  constructor(private readonly weatherService: WeatherService, private readonly caldavService: CalDavService) {
    this.weatherService.forecasts$.subscribe(weather => this.server?.emit('weather', weather));
    this.caldavService.events$.subscribe(events => this.server?.emit('calendar', events));
  }

  public handleConnection(client: Socket): void {
    Logger.log(`Client connected: ${client.id}`);
    this.removeClient(client.id);

    const subscriptions = new Subscription();

    this.addSubscription(subscriptions, client, this.weatherService.forecasts$, 'weather');
    this.addSubscription(subscriptions, client, this.caldavService.events$, 'calendar');

    this.clients[client.id];
  }

  public handleDisconnect({ id }: Socket): void {
    Logger.log(`Client disconnected: ${id}`);
    this.removeClient(id);
  }

  private removeClient(clientID: string): void {
    if (this.clients[clientID]) {
      this.clients[clientID].unsubscribe();
      delete this.clients[clientID];
    }
  }

  private addSubscription(subscription: Subscription, client: Socket, observable$: Observable<unknown>, key: string): void {
    subscription.add(
      observable$.pipe(distinctUntilChanged((a, b) => isEqual(a, b))).subscribe(data => {
        Logger.log(`EMITTING ${key.toUpperCase()} UPDATE`);
        client.emit(key, data);
      })
    );
  }
}
