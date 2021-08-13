import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "src/modules/auth";
import { BasicController } from "./basic.controller";
import { BasicService } from "./basic.service";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }], 'dinning')
  ],
  controllers: [BasicController],
  providers: [BasicService, UserService, JwtStrategy],
})
export class BasicModule { }