import { Prop, Schema, raw, SchemaFactory } from "@nestjs/mongoose"
import { User } from "../user/basic/user.schema"
import * as mongoose from 'mongoose';

export type RestaurantDocument = Restaurant & Document

@Schema()
class Localization {
    @Prop({ default: null })
    lat: Number
    @Prop({ default: null })
    lon: Number
    @Prop({ default: "" })
    address: String
}

@Schema()
class TimeRange {
    @Prop({ default: null })
    begin: Date
    @Prop({ default: null })
    end: Date
}

@Schema()
export class Restaurant {
    @Prop({ default: "" })
    title: string
    @Prop({ default: null })
    phoneNumber: string
    @Prop({ default: "" })
    subTitle: string
    @Prop({ default: "" })
    slogan: string
    @Prop({ default: null })
    color: string
    @Prop(raw(TimeRange))
    timeRange: TimeRange
    @Prop({ default: "" })
    cover: string
    @Prop({ default: "" })
    description: string
    @Prop({ default: false })
    onTheSpot: boolean
    @Prop({ default: false })
    delivery: boolean
    @Prop({ default: false })
    takeAway: boolean
    @Prop(raw(Localization))
    localization: Localization
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[]
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)


