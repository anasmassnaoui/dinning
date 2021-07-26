import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicModule } from './features/user/basic/';
import { AuthModule, JwtGuard, JwtStrategy } from './modules/auth';


@Module({
  imports: [
    AuthModule,
    BasicModule,
    MongooseModule.forRoot('mongodb+srv://dinning:dinning@cluster0.arsju.mongodb.net/dinning?retryWrites=true&w=majority', {
      connectionName: 'dinning',
      useNewUrlParser: true,
      useCreateIndex: true
    })
  ],
})
export class AppModule {}
