import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../user/basic/user.schema";
import { RestaurantFormDto } from "./restaurant.dto";
import { Restaurant, RestaurantDocument } from "./restaurant.schema";



@Injectable()
export class RestaurantService {

    constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

    async get(userId: String) : Promise<RestaurantFormDto> {
       const restaurant = await this.restaurantModel.findOne({ owner: userId as unknown as User })

       return restaurant
    }

    async create() {

    }

    async update(userId: String, restaurantFormDto: RestaurantFormDto) : Promise<RestaurantFormDto> {
        const restaurant = await this.restaurantModel.updateOne({ owner: userId as unknown as User }, restaurantFormDto)
        
        return this.get(userId)
    }

}
