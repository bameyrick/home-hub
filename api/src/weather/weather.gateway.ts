import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { isEqual } from '@qntm-code/utils';
import { Server } from 'http';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { Socket } from 'socket.io';
import { WeatherService } from './weather.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WeatherGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server?: Server;

  private readonly clients: Record<string, Subscription> = {};

  constructor(private readonly weatherService: WeatherService) {
    this.weatherService.forecasts$.subscribe(weather => this.server?.emit('weather', weather));
  }

  public handleConnection(client: Socket): void {
    Logger.log(`Client connected: ${client.id}`);
    this.removeClient(client.id);

    this.clients[client.id] = this.weatherService.forecasts$.pipe(distinctUntilChanged((a, b) => isEqual(a, b))).subscribe(weather => {
      Logger.log('EMITTING WEATHER UPDATE');
      client.emit('weather', weather);
    });
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
}
