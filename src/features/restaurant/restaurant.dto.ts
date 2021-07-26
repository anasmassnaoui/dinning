import { IsBoolean, IsDate, IsNumber, IsPhoneNumber, IsString } from "class-validator"
import { BaseEntity, Entity } from "src/libs/PropsCleanerNestInterceptor"


@BaseEntity({ strict: true })
export class RestaurantFormDto {
    @IsString()
    @Entity()
    title: string
    @IsPhoneNumber()
    @Entity()
    phoneNumber: string
    @IsString()
    @Entity()
    subTitle: string
    @IsString()
    @Entity()
    slogan: string
    @IsString()
    @Entity()
    color: string
    @Entity()
    timeRange: TimeRange
    @IsString()
    @Entity()
    cover: string
    @IsString()
    @Entity()
    description: string
    @IsBoolean()
    @Entity()
    onTheSpot: boolean
    @IsBoolean()
    @Entity()
    delivery: boolean
    @IsBoolean()
    @Entity()
    takeAway: boolean
    @Entity()
    localization: Localization
}

@BaseEntity({ strict: true })
export class TimeRange {
    @IsDate()
    @Entity()
    begin: Date
    @IsDate()
    @Entity()
    end: Date
}

@BaseEntity({ strict: true })
export class Localization {
    @IsNumber()
    @Entity()
    lat: Number
    @IsNumber()
    @Entity()
    lon: Number
    @IsString()
    @Entity()
    address: String
}
