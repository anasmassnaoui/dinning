import { Prop, Schema, raw, SchemaFactory } from "@nestjs/mongoose"
import { User } from "../user/basic/user.schema"
import { Localization, TimeRange } from './restaurant.dto'
import * as mongoose from 'mongoose';

export type RestaurantDocument = Restaurant & Document

@Schema()
export class Restaurant {
    @Prop()
    title: string
    @Prop()
    phoneNumber: string
    @Prop()
    subTitle: string
    @Prop()
    slogan: string
    @Prop()
    color: string
    @Prop(raw({
        begin: { type: Date },
        end: { type: Date }
    }))
    timeRange: TimeRange
    @Prop()
    cover: string
    @Prop()
    description: string
    @Prop()
    onTheSpot: boolean
    @Prop()
    delivery: boolean
    @Prop()
    takeAway: boolean
    @Prop(raw({
        lat: { type: Number },
        lon: { type: Number },
        address: { type: String }
    }))
    localization: Localization
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    owner: User
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[]
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)


