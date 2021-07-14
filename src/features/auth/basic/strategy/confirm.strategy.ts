import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth.service";


@Injectable()
export class ConfirmStrategy extends PassportStrategy(Strategy, 'confirm') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'basicInfo',
            passwordField: 'confirmationNumber',
        })
    }

    async validate(basicInfo: string, confirmationNumber: string) : Promise<any> {
        console.log("confirm")
        throw new UnauthorizedException();
    }
    
}