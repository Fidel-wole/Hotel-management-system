import mongoose, {Schema, Document} from "mongoose";
import {Room as RoomInterface} from "../interface/room";

interface RoomDocument extends RoomInterface, Document {}

const RoomSchema = new Schema<RoomDocument>(
    {
        number: {type: String, required: true},
        type: {type: String, enum: ["single", "double", "suite", "deluxe"]},
        category: {type: Schema.Types.ObjectId, ref: "Category"},
        pricePerNight: {type: Number},
        isOccupied: {type: Boolean, default: false},
        features: [{type: String}],
        maxOccupancy: {type: Number},
        currentOccupants: {type: Number,  default: 0},
        images: [{type: String}],
        floor: {type: Number},
        notes: {type: String},
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model<RoomDocument>("Room", RoomSchema);
export default Room;
