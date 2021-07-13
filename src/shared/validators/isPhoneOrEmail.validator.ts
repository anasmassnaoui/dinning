import { isEmail, isPhoneNumber, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "IsPhoneNumberOrEmail", async: true })
export class IsPhoneNumberOrEmail implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        if (isPhoneNumber(value, 'MA'))
            return true;
        if (isEmail(value))
            return true;
        return false;
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return validationArguments.property + " must be a valid phone number or valid email"
    }
}