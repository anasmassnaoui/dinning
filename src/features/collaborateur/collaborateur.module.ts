import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "src/features/users/users.service";
import { JwtStrategy } from "src/modules/auth";
import { Restaurant, RestaurantSchema } from "../restaurant/restaurant.schema";
import { CollaborateurController } from "./collaborateur.controller";
import { CollaborateurService } from "./collaborateur.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Restaurant.name,
            schema: RestaurantSchema
        }], 'dinning')
    ],
    controllers: [CollaborateurController],
    providers: [CollaborateurService, JwtStrategy]
})
export class CollaborateurModule { }