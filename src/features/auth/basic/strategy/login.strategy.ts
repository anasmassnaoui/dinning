import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginFormDto } from "../dto";
import { AuthService } from "../service/auth.service";


@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'basicInfo',
            passwordField: 'password',
        })
    }

    async validate(basicInfo: string, password: string) : Promise<any> {
        throw new NotFoundException();
    }
}