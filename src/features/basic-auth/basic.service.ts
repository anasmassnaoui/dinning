import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isEmail } from "class-validator";
import { Model } from "mongoose";
import { User, UserDocument } from "../users/user.schema";
import { Role } from "src/shared/types";
import { RegisterFormDto, ConfirmationFormDto, LoginFormDto } from "./dto";
import { parsePhoneNumber } from 'libphonenumber-js'
import { AuthService } from "../../modules/auth";


@Injectable()
export class BasicService {
    constructor(
        private authService: AuthService,
        @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    destruct_basicInfo(basicInfo: string): { email?: string, phone?: string } {

        if (isEmail(basicInfo))
            return { email: basicInfo }
        else
            return { phone: parsePhoneNumber(basicInfo).formatInternational() }

    }

    async register(registerForm: RegisterFormDto): Promise<any> {

        const { role, basicInfo } = registerForm

        const { email, phone } = this.destruct_basicInfo(basicInfo)

        if (role == Role.Client && !phone)
            throw new NotAcceptableException("client users must register only with phone number")

        const user = await this.userModel.findOne(email ? { email } : { phone })
        if (user)
            throw new NotAcceptableException("user already registred")

        if (phone) {
            // TODO: send an sms contain the verification number
        }
        else if (email) {
            // TODO: send a mail contain the verification number
        }

        const confirmationNumber = Math.floor(Math.random() * 999999)

        await new this.userModel({ role, ...(email ? { email } : { phone }), confirmationNumber }).save()
    }

    async confirm(confirmationForm: ConfirmationFormDto): Promise<any> {

        const { basicInfo, confirmationNumber, password, firstName, lastName } = confirmationForm

        const { email, phone } = this.destruct_basicInfo(basicInfo)

        const user = await this.userModel.findOne(email ? { email } : { phone })
        const { role, active, _id } = user

        if (!user)
            throw new NotAcceptableException("user not registred")

        if (active)
            throw new NotAcceptableException("user alredy confirmed")

        if (confirmationNumber != user.confirmationNumber)
            throw new NotAcceptableException("invalid Confirmation Number")

        user.password = password
        user.firstName = firstName
        user.lastName = lastName
        user.active = true

        await user.save()


        return { access_token: this.authService.generateToken(_id, role) }
    }

    async login(loginForm: LoginFormDto): Promise<any> {

        const { basicInfo, password } = loginForm

        const { email, phone } = this.destruct_basicInfo(basicInfo)

        const user = await this.userModel.findOne(email ? { email } : { phone })
        const { role, active, _id } = user

        if (!user)
            throw new NotAcceptableException("user not registred")

        if (!active)
            throw new NotAcceptableException("user must complete registration")

        if (password != user.password)
            throw new NotAcceptableException("incorrect password")

        return { access_token: this.authService.generateToken(_id, role) }
    }
}