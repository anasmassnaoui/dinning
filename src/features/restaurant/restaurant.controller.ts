import { Body, Get, Put, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantFormDto } from './restaurant.dto'
import { PropsCleanerNestInterceptor } from "src/libs/PropsCleanerNestInterceptor";
import { JwtGuard } from "src/modules/auth";




export class RestaurantController {

    constructor(private restaurantService: RestaurantService) {}

    @UseGuards(JwtGuard)
    @UseInterceptors(new PropsCleanerNestInterceptor(RestaurantFormDto))
    @Get()
    async get(@Request() req) : Promise<RestaurantFormDto> {
        return this.restaurantService.get(req.userId);
    }

    @UseGuards(JwtGuard)
    @UseInterceptors(new PropsCleanerNestInterceptor(RestaurantFormDto))
    @Put()
    async put(@Request() req, @Body() restaurantFormDto : RestaurantFormDto) : Promise<RestaurantFormDto> {
        return this.restaurantService.update(req.userId, restaurantFormDto)
    }

}

