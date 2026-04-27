import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["individual", "doble", "suite", "familiar"]
    },
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;