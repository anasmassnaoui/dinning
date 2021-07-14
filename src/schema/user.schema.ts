import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Devise, Role } from "src/shared/types";
import { Document } from 'mongoose'

export type UserDocument = User & Document


@Schema()
export class User {
    @Prop({ unique: true })
    email: string;
    @Prop({ unique: true })
    phone: string;
    @Prop({ unique: true })
    facebook: string;
    @Prop({ unique: true })
    google: string;
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    devise: Devise;
    @Prop()
    role: Role;
    @Prop()
    active: boolean;
    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)