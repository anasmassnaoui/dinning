import { Body, Controller, Get, Put, Request, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { PropsCleanerNestInterceptor } from "../../libs/PropsCleanerNestInterceptor";
import { OtherUserDto, UserFormGetDto, UserFormPostDto } from "./users.dto";
import { JwtGuard } from "../../modules/auth";
import { UserService } from "./users.service";

@Controller("users")
export class UsersController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtGuard)
    @UseInterceptors(new PropsCleanerNestInterceptor(UserFormGetDto))
    @Get("me")
    async user(@Request() req): Promise<UserFormGetDto> {
        return this.userService.user(req.user.userId);
    }

    @UseGuards(JwtGuard)
    @Put("me")
    async updateUser(@Request() req, @Body() userForm: UserFormPostDto): Promise<UserFormGetDto> {
        return this.userService.updateUser(req.user.userId, userForm);
    }

    @UseGuards(JwtGuard)
    @Get()
    users(): Promise<OtherUserDto[]> {
        return this.userService.users()
    }
}