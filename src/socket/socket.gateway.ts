import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'socket', cors: true })
export default class SocketGateway {
  @WebSocketServer() server: Server;

  /**
   * 연결된 모든 커넥션들에게 메세지 전파
   */
  @SubscribeMessage('broadcast:request')
  handleBroadcast() {
    this.server.emit('broadcast:response', `This is a broadcast from server`);
  }

  /**
   * 현재 연결된 커넥션 개수 요청
   */
  @SubscribeMessage('connections:request')
  async handleConnections(client: Socket) {
    client.emit('connections:response', this.getConnectionSize());
  }

  private getConnectionSize() {
    return (this.server.sockets as unknown as Map<string, any>).size;
  }
}
