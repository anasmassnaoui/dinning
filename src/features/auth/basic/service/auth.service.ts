import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schema/user.schema";
import { Devise, Role } from "src/shared/types";
import { inspect } from "util";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createTestUser() : Promise<any> {
        const user = await new this.userModel({
            firstName: "test",
            lastName: "test",
            password: "pass",
            devise: Devise.EURO,
            role: Role.Admin,
            active: false
        })

        const { password, role, devise, ...rest } = user.toJSON()

        return {
            ...rest,
            role: Role[role],
            devise: Devise[devise]
        }
    }
    
}