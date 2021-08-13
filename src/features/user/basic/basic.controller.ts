import { Body, Controller, Get, Put, Request, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { PropsCleanerNestInterceptor } from "../../../libs/PropsCleanerNestInterceptor";
import { UserFormGetDto, UserFormPostDto } from "./dto/userForm.dto";
import { BasicService } from "./basic.service";
import { JwtGuard } from "../../../modules/auth";
import { RegisterFormDto, ConfirmationFormDto, LoginFormDto } from "./dto";
import { UsersGetDto } from "src/features/restaurant/users/users.dto";
import { UserService } from "./user.service";

@Controller()
export class BasicController {

    constructor(private basicService: BasicService, private userService: UserService) { }

    @Post("basic/register")
    async register(@Body() registerForm: RegisterFormDto): Promise<any> {
        return this.basicService.register(registerForm);
    }

    @Post("basic/confirm")
    async confirm(@Body() confirmationForm: ConfirmationFormDto): Promise<any> {
        return this.basicService.confirm(confirmationForm);
    }

    @Post("basic/login")
    async login(@Body() loginForm: LoginFormDto): Promise<any> {
        return this.basicService.login(loginForm);
    }

    @UseGuards(JwtGuard)
    @UseInterceptors(new PropsCleanerNestInterceptor(UserFormGetDto))
    @Get("/user")
    async user(@Request() req): Promise<UserFormGetDto> {
        return this.userService.user(req.user.userId);
    }

    @UseGuards(JwtGuard)
    @Put("/user")
    async updateUser(@Request() req, @Body() userForm: UserFormPostDto): Promise<UserFormGetDto> {
        return this.userService.updateUser(req.user.userId, userForm);
    }

    @UseGuards(JwtGuard)
    @Get("/users")
    users(): Promise<UsersGetDto[]> {
        return this.userService.users()
    }
}