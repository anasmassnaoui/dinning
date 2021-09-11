import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/features/users/user.schema";
import { StatusDto } from "src/shared/dto/status.dto";
import { Restaurant, RestaurantDocument } from "../restaurant/restaurant.schema";
import { CollaborateurDto } from "./collaborateur.dto";


export class CollaborateurService {

    constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) { }

    async get(userId: string): Promise<CollaborateurDto[]> {
        const resaturant = await this.restaurantModel.findOne({ owner: userId as unknown as User }).populate("collaborateurs", "email firstName lastName")

        return resaturant?.collaborateurs
    }

    async put(userId: string, collaborateurId: string): Promise<StatusDto> {
        const result = await this.restaurantModel.updateOne({ owner: userId as unknown as User }, {
            $addToSet: {
                collaborateurs: collaborateurId
            }
        })
        return {
            status: result.n > 0
        }
    }

    async delete(userId: string, collaborateurId: string): Promise<StatusDto> {
        const result = await this.restaurantModel.updateOne({ owner: userId as unknown as User }, {
            $pull: {
                collaborateurs: collaborateurId
            }
        })
        return {
            status: result.n > 0
        }
    }
}