import { Injectable,} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/shared/types";


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    generateToken(userId: string, role: Role) : string {
        return this.jwtService.sign({ userId, role: Role[role] })
    }
}