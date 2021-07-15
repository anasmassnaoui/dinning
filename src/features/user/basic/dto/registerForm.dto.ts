import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, Validate } from "class-validator";
import { Role } from "src/shared/types/role.type";
import { IsPhoneNumberOrEmail } from "src/shared/validators/isPhoneOrEmail.validator";

export class RegisterFormDto {
    @Validate(IsPhoneNumberOrEmail)
    basicInfo: string;
    @IsEnum(Role)
    //@Transform(({ value }) => typeof value == "string" ? Role[value] : value)
    role: Role;
}