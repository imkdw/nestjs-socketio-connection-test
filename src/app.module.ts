import { Module } from '@nestjs/common';
import SocketModule from './socket/socket.module.js';

@Module({
  imports: [SocketModule],
})
export class AppModule {}
