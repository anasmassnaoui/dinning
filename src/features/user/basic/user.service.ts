import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { Devise, Role } from "src/shared/types";
import { UserFormGetDto, UserFormPostDto } from "./dto";
import { AuthService } from "../../../modules/auth";
import { UsersGetDto } from "src/features/restaurant/users/users.dto";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


    async updateUser(userId: string, userForm: UserFormPostDto): Promise<UserFormGetDto> {
        await this.userModel.updateOne({ _id: userId }, userForm)

        return this.user(userId)
    }

    async user(userId: string): Promise<UserFormGetDto> {
        const user = await this.userModel.findOne({ _id: userId })

        const { role, devise, ...rest } = user.toJSON()

        return {
            ...rest,
            role: Role[role],
            devise: Devise[devise]
        }
    }

    async users(): Promise<UsersGetDto[]> {
        const users = await this.userModel.find()

        return users
    }

}