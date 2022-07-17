const {check} = require('express-validator');
const Router = require('express');
const { billSave, billUpdate, billDelete, billSearch, billAll } = require('../controller/bill');
const { validateResult } = require('../middlewares/validate');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

router.post('/',[
    validateJwt,
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('value', 'el nombre es obligatorio').not().isEmpty(),
    check('user', 'Id invalido').isMongoId(),
    validateResult
],billSave);

router.put('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('value', 'el nombre es obligatorio').not().isEmpty(),
    check('user', 'Id invalido user').isMongoId(),
    validateResult
],billUpdate);

router.delete('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],billDelete);

router.get('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],billSearch);

router.get('/', [
    validateJwt,    
    validateResult
], billAll);



module.exports = router;