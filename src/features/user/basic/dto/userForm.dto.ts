import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { BaseEntity, Entity } from "../../../../libs/PropsCleanerNestInterceptor"
import { Devise } from "src/shared/types"
import { Transform } from "class-transformer"

@BaseEntity({ strict: true })
class UserFormDto {
    @IsEmail()
    @IsOptional()
    @Entity()
    email: string
    @IsPhoneNumber()
    @IsOptional()
    @Entity()
    phone: string
    @IsString()
    @IsOptional()
    @Entity()
    facebook: string
    @IsString()
    @IsOptional()
    @Entity()
    google: string
    @IsString()
    @IsOptional()
    @Entity()
    firstName: string
    @IsString()
    @IsOptional()
    @Entity()
    lastName: string
}

@BaseEntity({ strict: true })
export class UserFormGetDto extends UserFormDto {
    @Entity()
    role: string
    @Entity()
    active: boolean
    @Entity()
    devise: string
}

export class UserFormPostDto extends UserFormDto {
    @IsEnum(Devise)
    @IsOptional()
    @Transform(({ value }) => typeof value == "string" ? Devise[value] : value)
    devise: Devise
}