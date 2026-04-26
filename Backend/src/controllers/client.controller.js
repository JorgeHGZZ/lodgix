import Client from '../models/Client.js';

export const crearClient = async (req, res) =>{
    try{
        const { name, email, phone, address } = req.body;

        if(!name || !email || !phone || !address){
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

        // Verificar si el cliente ya existe
        const exist = await Client.findOne({email});
        if(exist){
            return res.status(400).json({ message: "El cliente ya existe" });
        }

        const client = await Client.create({name, email, phone, address});

        res.status(201).json({ message: "Cliente creado correctamente", client });

    }catch(error){
        res.status(500).json({
            message: "Error al crear cliente",
            error: error.message
        });
    }
}

export const getClients = async(req,res) => {
    try{
        const clients = await Client.find().select("name phone");
        res.json(clients);
    }catch(error){
        res.status(500).json({
            message: "Error al obtener clientes",
            error: error.message
        });
    }
}

export const getClientById = async(req,res) => {
    try{
        const { id } = req.params;  
        const client = await Client.findById(id).select("name email phone address");
        if(!client){
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(client);
    }catch(error){
        res.status(500).json({
            message: "Error al obtener cliente",
            error: error.message
        });
    }
}

export const updateClient = async(req,res) => {
    try{
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const client = await Client.findById(id);
        if(!client){
            return res.status(404).json({ message: "Cliente no encontrado" });
        }  
        // Verificar si el nuevo email ya está en uso por otro cliente
        if (email) {
            const existingClient = await Client.findOne({ email, _id: { $ne: id } });
            if (existingClient) {
                return res.status(400).json({ message: "El email ya está en uso" });
            }
        }
    
        const updateData = {name, email, phone, address};

        const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true }).select("name email phone address");
        res.status(200).json({ message: "Cliente actualizado correctamente" });
    }catch(error){
        res.status(500).json({
            message: "Error al actualizar cliente",
            error: error.message
        });
    }
}

export const deleteClient = async(req,res) => {
    try{
        const { id } = req.params;
        const client = await Client.findByIdAndDelete(id);
        if(!client){
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente eliminado correctamente" });
    }catch(error){
        res.status(500).json({
            message: "Error al eliminar cliente",
            error: error.message
        });
    }
}
