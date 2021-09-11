import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "src/modules/auth";
import { RestaurantController } from "./restaurant.controller";
import { Restaurant, RestaurantSchema } from "./restaurant.schema";
import { RestaurantService } from "./restaurant.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Restaurant.name,
      schema: RestaurantSchema
    }], 'dinning')
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, JwtStrategy]
})
export class RestaurantModule { }