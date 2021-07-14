import { Body, Controller, Post } from "@nestjs/common";
import { RegisterFormDto, ConfirmationFormDto, LoginFormDto } from '../dto'


@Controller("auth/basic")
export class BasicController {

    @Post("register")
    register(@Body() registerForm: RegisterFormDto) : RegisterFormDto {
        return registerForm;
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