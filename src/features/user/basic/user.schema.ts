import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Devise, Role } from "src/shared/types";
import { Document } from 'mongoose'

export type UserDocument = User & Document


@Schema()
export class User {
    @Prop({ default: '' })
    email: string;
    @Prop({ default: '' })
    phone: string;
    @Prop({ default: '' })
    facebook: string;
    @Prop({ default: '' })
    google: string
    @Prop({ default: '' })
    firstName: string
    @Prop({ default: '' })
    lastName: string
    @Prop()
    devise: Devise
    @Prop()
    role: Role
    @Prop({ default: false })
    active: boolean
    @Prop()
    password: string
    @Prop()
    confirmationNumber: number
}

export const UserSchema = SchemaFactory.createForClass(User)