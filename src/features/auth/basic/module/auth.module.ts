import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { BasicController } from "../controller/basic.controller";
import { AuthService } from "../service/auth.service";
import { ConfirmStrategy, LoginStrategy } from "../strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: "secret"
        }),
    ],
    controllers: [ BasicController ],
    providers:[ AuthService, ConfirmStrategy, LoginStrategy ],
    exports: [ LoginStrategy ],
})
export class AuthModule {}