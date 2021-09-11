import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/modules/auth";
import { StatusDto } from "src/shared/dto/status.dto";
import { CollaborateurDto, CollaborateurSetDto } from "./collaborateur.dto";
import { CollaborateurService } from "./collaborateur.service";

@Controller("/collaborateur")
export class CollaborateurController {

    constructor(private collaborateurService: CollaborateurService) { }

    @UseGuards(JwtGuard)
    @Get()
    async get(@Request() req): Promise<CollaborateurDto[]> {
        return this.collaborateurService.get(req.user.userId)
    }

    @UseGuards(JwtGuard)
    @Put(":id")
    async put(@Request() req, @Param("id") collaborateurId: string): Promise<StatusDto> {
        return this.collaborateurService.put(req.user.userId, collaborateurId)
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    async remove(@Request() req, @Param("id") collaborateurId: string): Promise<StatusDto> {
        return this.collaborateurService.delete(req.user.userId, collaborateurId)
    }

}