import { Body, Controller, Get, Put, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/modules/auth";
import { StatusDto } from "src/shared/dto/status.dto";
import { Item, Menu, MI } from "../restaurant/restaurant.schema";
import { MIDto } from "./menu.dto";
import { MenuService } from "./menu.service";

@Controller("/menu")
export class MenuController {

    constructor(private menuService: MenuService) { }

    @UseGuards(JwtGuard)
    @Get("*")
    async get(@Request() req): Promise<(Menu | Item)[]> {
        const location = req.originalUrl.split('/').filter(e => e != "menu" && e.length != 0)

        return this.menuService.get(req.user.userId, location)
    }

    @UseGuards(JwtGuard)
    @Put("*")
    async add(@Request() req, @Body() miDto: MIDto): Promise<StatusDto> {
        const location = req.originalUrl.split('/').filter(e => e != "menu" && e.length != 0)

        const { type, name } = miDto

        if (type == MI.Menu) {
            const menu = new Menu()
            menu.type = type
            menu.name = name
            menu.subMenu = []
            return this.menuService.add(req.user.userId, location, menu)
        }
        else if (type == MI.Item) {
            const item = new Item()
            item.type = type
            item.name = name
            item.image = "fff"
            return this.menuService.add(req.user.userId, location, item)
        }
    }

}