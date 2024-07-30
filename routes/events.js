/*
    Rutas de usuario / Auth
    host + api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { createEvent, actualizarEvento, eliminarEvento, getEventos } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router = Router();
//todas tienen que pasar la validacion del JWT
router.use(validarJWT);




//Obtener eventos
router.get('/', getEventos);


//Crear eventos
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorioa').custom((value) => isDate(value)),
        check('end', 'Fecha de finalización es obligatorioa').custom((value) => isDate(value)),
        validarCampos
    ],
    createEvent);



//Crear eventos
router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorioa').custom((value) => isDate(value)),
        check('end', 'Fecha de finalización es obligatorioa').custom((value) => isDate(value)),
        validarCampos
    ],
    actualizarEvento);


//Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;
