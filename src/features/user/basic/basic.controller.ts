import { Body, Controller, Get, Put, Request, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { PropsCleanerNestInterceptor } from "../../../libs/PropsCleanerNestInterceptor";
import { UserFormGetDto, UserFormPostDto } from "./dto/userForm.dto";
import { BasicService } from "./basic.service";
import { JwtGuard } from "../../../modules/auth";
import { RegisterFormDto, ConfirmationFormDto, LoginFormDto } from "./dto";

@Controller("user/basic")
export class BasicController {

    constructor(private basicService: BasicService){}

    @Post("register")
    register(@Body() registerForm: RegisterFormDto) : Promise<any> {
        return this.basicService.register(registerForm);
    }

    @Post("confirm")
    confirm(@Body() confirmationForm: ConfirmationFormDto) : Promise<any> {
        return this.basicService.confirm(confirmationForm);
    }

    @Post("login")
    login(@Body() loginForm: LoginFormDto) : Promise<any> {
        return this.basicService.login(loginForm);
    }

    @UseGuards(JwtGuard)
    @UseInterceptors(new PropsCleanerNestInterceptor(UserFormGetDto))
    @Get()
    get(@Request() req) : Promise<UserFormGetDto> {
        return this.basicService.get(req.user.userId);
    }

    @UseGuards(JwtGuard)
    @Put()
    update(@Request() req, @Body() userForm: UserFormPostDto) : Promise<UserFormGetDto> {
        return this.basicService.update(req.user.userId, userForm);
    }
}