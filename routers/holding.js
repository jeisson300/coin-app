const {check} = require('express-validator');
const Router = require('express');
const { holdingSave, holdingUpdate, holdingDelete, holdingSearch, holdingAll } = require('../controller/holding');
const { validateResult } = require('../middlewares/validate');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();


router.post('/',[
    validateJwt,
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('value', 'el nombre es obligatorio').not().isEmpty(),
    check('date', 'la fecha  es obligatorio').not().isEmpty(),
    check('rate', 'la tasa es obligatorio').not().isEmpty(),
    check('user', 'Id invalido').isMongoId(),
    validateResult
],holdingSave);

router.put('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('value', 'el nombre es obligatorio').not().isEmpty(),
    check('date', 'la fecha  es obligatorio').not().isEmpty(),
    check('rate', 'la tasa es obligatorio').not().isEmpty(),
    check('user', 'Id invalido user').isMongoId(),
    validateResult
],holdingUpdate);

router.delete('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],holdingDelete);

router.get('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],holdingSearch);

router.get('/', [
    validateJwt,    
    validateResult
], holdingAll);


module.exports = router;