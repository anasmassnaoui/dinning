import { Body, Controller, Post } from "@nestjs/common";
import { User } from "src/schema/user.schema";
import { RegisterFormDto, ConfirmationFormDto, LoginFormDto } from '../dto'
import { AuthService } from "../service/auth.service";


@Controller("auth/basic")
export class BasicController {

    constructor(private authService: AuthService){}

    @Post("register")
    async register(@Body() registerForm: RegisterFormDto) : Promise<User> {
        return this.authService.createTestUser();
    }

    @Post("confirm")
    confirm(@Body() confirmationForm: ConfirmationFormDto) : ConfirmationFormDto {
        return confirmationForm;
    }

    @Post("login")
    login(@Body() loginForm: LoginFormDto) : LoginFormDto {
        return loginForm;
    }

}