import { Type } from "class-transformer"
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator"
import { BaseEntity, Entity } from "src/libs/PropsCleanerNestInterceptor"


@BaseEntity({ strict: true })
export class TimeRange {
    @IsDate()
    @Entity()
    @IsOptional()
    begin: Date
    @IsDate()
    @Entity()
    @IsOptional()
    end: Date
}

@BaseEntity({ strict: true })
export class Localization {
    @IsNumber()
    @Entity()
    @IsOptional()
    lat: Number
    @IsNumber()
    @Entity()
    @IsOptional()
    lon: Number
    @IsString()
    @Entity()
    @IsOptional()
    address: String
}

@BaseEntity({ strict: true })
export class RestaurantFormDto {
    @IsString()
    @Entity()
    @IsOptional()
    title: string
    @IsPhoneNumber()
    @Entity()
    @IsOptional()
    phoneNumber: string
    @IsString()
    @Entity()
    @IsOptional()
    subTitle: string
    @IsString()
    @Entity()
    @IsOptional()
    slogan: string
    @IsString()
    @Entity()
    @IsOptional()
    color: string
    @Entity()
    @ValidateNested({ each: true })
    @Type(() => TimeRange)
    timeRange: TimeRange
    @IsString()
    @Entity()
    @IsOptional()
    cover: string
    @IsString()
    @Entity()
    @IsOptional()
    description: string
    @IsBoolean()
    @Entity()
    @IsOptional()
    onTheSpot: boolean
    @IsBoolean()
    @Entity()
    @IsOptional()
    delivery: boolean
    @IsBoolean()
    @Entity()
    @IsOptional()
    takeAway: boolean
    @Entity()
    @ValidateNested({ each: true })
    @Type(() => Localization)
    localization: Localization
}
