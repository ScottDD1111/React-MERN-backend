const { Schema, model } = require('mongoose');

// Definir el esquema para el Usuario
const UsuarioSchema = Schema({
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
    }
});

// Exportar el modelo basado en el esquema
module.exports = model('Usuario', UsuarioSchema);
