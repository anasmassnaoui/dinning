import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";


@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: "secret"
        }),
    ],
    providers: [ AuthService ],
    exports: [ AuthService ]
})
export class AuthModule {}