import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { Devise } from "src/shared/types"
import "reflect-metadata";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, of, switchMap } from "rxjs";
import { inspect } from "util";

let classes: Map<string, Array<string>> = new Map()
let fields: Array<string> = []


function BaseEntity(ctr: Function) {
    classes[ctr.name] = fields
    fields = []
}

function Entity() {
    return function(target: Object, propertyKey: string) { 
        fields.push(propertyKey)
    }
}

export class PropsCleanerInterceptor implements NestInterceptor {
    constructor(private cls: Function) {}
    data: Object = {}

    checkResponse(cls, res, keys) {
        classes[cls.name]?.forEach(key => {
            if (keys.includes(key))
                this.data[key] = res[key]
        });
        cls = Object.getPrototypeOf(cls)
        if (cls.name != '')
            this.checkResponse(cls, res, keys)
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(switchMap(res => {
            if (res instanceof Object) {
                this.checkResponse(this.cls, res, Object.keys(res))
                return of(this.data)
            }
            return of(res);
        }))
    }
}

@BaseEntity
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

@BaseEntity
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
    //@Transform(({ value }) => typeof value == "string" ? Devise[value] : value)
    devise: Devise
}