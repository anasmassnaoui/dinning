import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth';
import { BasicAuthModule } from './features/basic-auth';
import { RestaurantModule } from './features/restaurant';
import { UsersModule } from './features/users';
import { MenuModule } from './features/menu';
import { CollaborateurModule } from './features/collaborateur/collaborateur.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dinning:dinning@cluster0.arsju.mongodb.net/dinning?retryWrites=true&w=majority', {
      connectionName: 'dinning',
      useNewUrlParser: true,
      useCreateIndex: true
    }),
    AuthModule,
    BasicAuthModule,
    UsersModule,
    RestaurantModule,
    CollaborateurModule,
    MenuModule
  ],
})
export class AppModule { }
