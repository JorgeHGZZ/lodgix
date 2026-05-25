import mongoose from "mongoose";

const maintenanceSchema= new mongoose.Schema({
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    priority:{
        type: String,
        enum:["Baja","Media","Alta"],
        required:true
    },
    description:{
        type: String,
    },
    status:{
        type:String, 
        enum:["Programada","En-Progreso","Completado","Cancelado"],
        default:"Programada"
    },
    isCanceled:{
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Maintenance", maintenanceSchema)