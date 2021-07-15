import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './features/user/basic/module/user.module';
import { AuthModule, AuthService } from './modules/auth';


@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://dinning:dinning@cluster0.arsju.mongodb.net/dinning?retryWrites=true&w=majority', {
      connectionName: 'dinning',
      useNewUrlParser: true,
      useCreateIndex: true
    })
  ],
  controllers: [],
})
export class AppModule {}
