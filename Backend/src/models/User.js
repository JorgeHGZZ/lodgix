
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    phone: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: ""
    }
}, {
    timestamps: true // createdAt, updatedAt
});

export default mongoose.model("user", userSchema);