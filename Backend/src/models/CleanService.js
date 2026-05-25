import mongoose from 'mongoose';

const cleanServiceSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Programada", "En-Progreso", "Completado"],
        default: "Programada"
    }
})

export default mongoose.model("CleanService", cleanServiceSchema)