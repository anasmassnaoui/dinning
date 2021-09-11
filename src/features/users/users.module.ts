import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "src/modules/auth";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { User, UserSchema } from "../users/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }], 'dinning')
    ],
    controllers: [UsersController],
    providers: [UserService, JwtStrategy],
})
export class UsersModule { }