import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "src/modules/auth";
import { BasicController } from "./basic.controller";
import { BasicService } from "./basic.service";
import { User, UserSchema } from "../users/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }], 'dinning')
  ],
  controllers: [BasicController],
  providers: [BasicService, JwtStrategy],
})
export class BasicAuthModule { }