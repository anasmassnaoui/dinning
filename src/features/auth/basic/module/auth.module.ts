import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "src/schema/user.schema";
import { BasicController } from "../controller/basic.controller";
import { AuthService } from "../service/auth.service";
import { ConfirmStrategy, LoginStrategy } from "../strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: "secret"
        }),
        MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema
        }], 'dinning')
    ],
    controllers: [ BasicController ],
    providers:[ AuthService, ConfirmStrategy, LoginStrategy ],
    exports: [ LoginStrategy ],
})
export class AuthModule {}