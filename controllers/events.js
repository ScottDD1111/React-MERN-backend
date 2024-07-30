const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');
    res.status(201).json({
        ok: true,
        eventos
    });
}

const createEvent = async (req, res = response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el evento para ese id'
            });
        }


        if (evento.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }


        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(201).json({
            ok: true,
            eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const eliminarEvento = async (req, res = response) => {
    //Obtengo id del evento y del usuario
    const eventoId = req.params.id;
    const uid = req.uid;


    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el evento para ese id'
            });
        }


        if (evento.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const eventoActualizado = await Evento.findByIdAndDelete(eventoId);

        res.status(201).json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    createEvent,
    actualizarEvento,
    eliminarEvento
}