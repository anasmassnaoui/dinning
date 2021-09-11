import { Body, Controller, Get, Put, Request, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { PropsCleanerNestInterceptor } from "../../libs/PropsCleanerNestInterceptor";
import { UserFormGetDto, UserFormPostDto } from "../users/users.dto";
import { BasicService } from "./basic.service";
import { JwtGuard } from "../../modules/auth";
import { RegisterFormDto, ConfirmationFormDto, LoginFormDto } from "./dto";

@Controller("basic")
export class BasicController {

    constructor(private basicService: BasicService) { }

    @Post("register")
    async register(@Body() registerForm: RegisterFormDto): Promise<any> {
        return this.basicService.register(registerForm);
    }

    @Post("confirm")
    async confirm(@Body() confirmationForm: ConfirmationFormDto): Promise<any> {
        return this.basicService.confirm(confirmationForm);
    }

    @Post("login")
    async login(@Body() loginForm: LoginFormDto): Promise<any> {
        return this.basicService.login(loginForm);
    }
}