import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './features/auth/basic/module/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://dinning:dinning@cluster0.arsju.mongodb.net/dinning?retryWrites=true&w=majority', {
      connectionName: 'dinning',
      useNewUrlParser: true,
      useCreateIndex: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
