import { Prop, Schema, raw, SchemaFactory } from "@nestjs/mongoose"
import { User } from "../users/user.schema"
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

export enum MI { Menu, Item }

export class Menu {
    type: MI
    name: string
    subMenu?: (Menu | Item)[]
}

export class Item {
    type: MI
    name: string
    image: string
}

@Schema()
export class Restaurant {

    @Prop({ type: [{ type: mongoose.Schema.Types.Mixed }] })
    menu: (Menu | Item)[]
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
    collaborateurs: User[]
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)


