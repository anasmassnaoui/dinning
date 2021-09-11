import { Transform } from "class-transformer"
import { IsEnum, IsString } from "class-validator"
import { MI } from "../restaurant/restaurant.schema"

export class MIDto {
    @IsEnum(MI)
    @Transform(({ value }) => typeof value == "string" ? MI[value] : value)
    type: MI
    @IsString()
    name: string
    image: string
}