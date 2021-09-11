import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "src/modules/auth";
import { Restaurant, RestaurantSchema } from "../restaurant/restaurant.schema";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";


@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Restaurant.name,
            schema: RestaurantSchema
        }], 'dinning')
    ],
    controllers: [MenuController],
    providers: [MenuService, JwtStrategy]
})
export class MenuModule { }