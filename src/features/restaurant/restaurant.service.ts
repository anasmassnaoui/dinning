import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../user/basic/user.schema";
import { RestaurantFormDto } from "./restaurant.dto";
import { Restaurant, RestaurantDocument } from "./restaurant.shema";



@Injectable()
export class RestaurantService {

    constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

    async get(userId: String) : Promise<RestaurantFormDto> {
       const restaurant = await this.restaurantModel.findOne({ owner: userId })

       return restaurant
    }

    async create() {

    }

    async update() {

    }

}
