import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/basic/module/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
