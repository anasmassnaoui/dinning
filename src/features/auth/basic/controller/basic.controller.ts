import { Body, Controller, Post } from "@nestjs/common";
import { RegisterFormDto } from "../dto/types.dto";



@Controller("auth/basic")
export class BasicController {

    @Post()
    async register(@Body() registerForm: RegisterFormDto) : Promise<RegisterFormDto> {
        return registerForm;
    }

}