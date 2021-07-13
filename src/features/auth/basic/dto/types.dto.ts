import { IsEnum, IsNotEmpty, Validate } from "class-validator";
import { Role } from "src/shared/types/role.type";
import { IsPhoneNumberOrEmail } from "src/shared/validators/isPhoneOrEmail.validator";

export class RegisterFormDto {
    @Validate(IsPhoneNumberOrEmail)
    basicInfo: string;
    @IsEnum(Role)
    role: Role;
}