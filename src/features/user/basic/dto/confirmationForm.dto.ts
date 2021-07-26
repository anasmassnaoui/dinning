import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsPhoneNumberOrEmail } from "src/shared/validators/isPhoneOrEmail.validator";

export class ConfirmationFormDto {
    @Validate(IsPhoneNumberOrEmail)
    basicInfo: string;
    @IsNumber()
    confirmationNumber: number;
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
}