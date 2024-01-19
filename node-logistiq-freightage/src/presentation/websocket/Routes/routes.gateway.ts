import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { NewPointsDto } from './newPoints.dto'

@WebSocketGateway({ cors: { origin: '*' } })
export class RoutesGateway {
  @SubscribeMessage('newPoints')
  handleMessage(client: Socket, payload: NewPointsDto) {
    client.broadcast.emit('adminNewPoint', payload)
    client.broadcast.emit(`newPoints/${payload.routeId}`, payload)
  }
}
