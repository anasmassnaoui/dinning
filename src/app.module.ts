import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicController } from './features/auth/basic/controller/basic.controller';

@Module({
  imports: [],
  controllers: [AppController, BasicController],
  providers: [AppService],
})
export class AppModule {}
