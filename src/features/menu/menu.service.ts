import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StatusDto } from "src/shared/dto/status.dto";
import { Item, Menu, MI, Restaurant, RestaurantDocument } from "../restaurant/restaurant.schema";
import { User } from "../users/user.schema";


@Injectable()
export class MenuService {

    constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) { }

    async get(userId: string, location: number[]): Promise<(Menu | Item)[]> {
        const restaurant = await this.restaurantModel.findOne({ owner: userId as unknown as User })

        let menu = restaurant.menu
        for (const menuIndex of location)
            menu = (menu[menuIndex] as Menu).subMenu

        return menu
    }

    async add(userId: string, location: number[], either: Menu | Item): Promise<StatusDto> {
        const restaurant = await this.restaurantModel.findOne({ owner: userId as unknown as User })

        let menu = restaurant.menu
        let values = []
        for (const menuIndex of location) {
            values.push(menu[menuIndex])
            menu = (menu[menuIndex] as Menu).subMenu
        }


        const result = await this.restaurantModel.updateOne({ owner: userId as unknown as User }, {
            $push: {
                ["menu" + location.map((_, i) => `.$[e${i}].subMenu`).join("")]: either
            }
        }, {
            arrayFilters: values.map((e, i) => ({ [`e${i}`]: e }))
        })


        return {
            status: result.n ? true : false
        }
    }
}