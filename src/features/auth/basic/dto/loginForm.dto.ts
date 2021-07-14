import { IsNotEmpty, Validate } from "class-validator";
import { IsPhoneNumberOrEmail } from "src/shared/validators/isPhoneOrEmail.validator";

export class LoginFormDto {
    @Validate(IsPhoneNumberOrEmail)
    basicInfo: string;
    @IsNotEmpty()
    password: string;
}