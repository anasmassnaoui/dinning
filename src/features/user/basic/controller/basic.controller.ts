import { Body, Controller, Get, Post, Put, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { RegisterFormDto, ConfirmationFormDto, LoginFormDto } from '../dto'
import { PropsCleanerInterceptor } from '../dto/userForm.dto'
import { UserFormGetDto, UserFormPostDto } from "../dto/userForm.dto";
import { JwtGuard } from "../guard";
import { UserService } from "../service/user.service";

@Controller("user/basic")
export class BasicController {

    constructor(private userService: UserService){}
    
    @Post("register")
    register(@Body() registerForm: RegisterFormDto) : Promise<any> {
        return this.userService.register(registerForm);
    }

    @Post("confirm")
    confirm(@Body() confirmationForm: ConfirmationFormDto) : Promise<any> {
        return this.userService.confirm(confirmationForm);
    }

    @Post("login")
    login(@Body() loginForm: LoginFormDto) : Promise<any> {
        return this.userService.login(loginForm);
    }

    printHello() {
        console.log("hello")
    }

    @UseGuards(JwtGuard)
    @UseInterceptors(new PropsCleanerInterceptor(UserFormGetDto))
    @Get()
    get(@Request() req) : Promise<UserFormGetDto> {
        return this.userService.get(req.user.userId);
    }

    @UseGuards(JwtGuard)
    @Put()
    update(@Request() req, @Body() userForm: UserFormPostDto) : Promise<UserFormGetDto> {
        return this.userService.update(req.user.userId, userForm);
    }
}