import { IsNumber, Validate } from "class-validator";
import { IsPhoneNumberOrEmail } from "src/shared/validators/isPhoneOrEmail.validator";

export class ConfirmationFormDto {
    @Validate(IsPhoneNumberOrEmail)
    basicInfo: string;
    @IsNumber()
    confirmationNumber: number;
}