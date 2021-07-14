import { IsEmail, IsPhoneNumber } from "class-validator";

export class UserInfoDto {
    @IsEmail()
    email: string;
    @IsPhoneNumber('MA')
    phone: string;
    facebook: string;
    google: string;
}