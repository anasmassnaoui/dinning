import { IsString } from "class-validator"
import { Role } from "src/shared/types"


export class CollaborateurDto {
    firstName: string
    lastName: string
    email: string
    role: Role
}

export class CollaborateurSetDto {
    @IsString()
    userId: string
}