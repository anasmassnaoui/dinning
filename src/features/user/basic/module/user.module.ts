import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "../schema/user.schema";
import { BasicController } from "../controller/basic.controller";
import { UserService } from "../service/user.service";
import { JwtStrategy } from "../strategy";

@Module({
    imports: [
        PassportModule,
        MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema
        }], 'dinning')
    ],
    controllers: [ BasicController ],
    providers:[ UserService, JwtStrategy ],
    exports: [ JwtStrategy ],
})
export class UserModule {}