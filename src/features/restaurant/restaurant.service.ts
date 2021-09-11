import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../users/user.schema";
import { RestaurantFormDto } from "./restaurant.dto";
import { Restaurant, RestaurantDocument } from "./restaurant.schema";



@Injectable()
export class RestaurantService {

    constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) { }

    async get(userId: String): Promise<RestaurantFormDto> {
        const restaurant = await this.restaurantModel.findOne({ owner: userId as unknown as User })

        return restaurant ? restaurant.toJSON() : this.create(userId)
    }

    async create(userId: String, restaurantFormDto?: RestaurantFormDto): Promise<RestaurantFormDto> {
        const restaurant = new this.restaurantModel({
            owner: userId,
            ...restaurantFormDto
        })

        await restaurant.save()

        return restaurant.toJSON();
    }

    async update(userId: String, restaurantFormDto: RestaurantFormDto): Promise<RestaurantFormDto> {
        const { timeRange = {}, localization = {}, ...rest } = restaurantFormDto
        let set = {}

        // partial update for localization
        Object
            .keys(localization)
            .forEach(key => set[`localization.${key}`] = localization[key])
        // partial update for timerange
        Object
            .keys(timeRange)
            .forEach(key => set[`timeRange.${key}`] = timeRange[key])

        const result = await this.restaurantModel.updateOne({ owner: userId as unknown as User }, {
            ...rest,
            $set: set
        })

        return result.n ? this.get(userId) : this.create(userId, restaurantFormDto)
    }

}
