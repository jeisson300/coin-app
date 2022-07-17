const {check} = require('express-validator');
const Router = require('express');
const { incomeSave, incomeUpdate, incomeDelete, incomeSearch, incomeAll } = require('../controller/income');
const { validateResult } = require('../middlewares/validate');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();


router.post('/',[
    validateJwt,
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('value', 'el nombre es obligatorio').not().isEmpty(),
    check('user', 'Id invalido').isMongoId(),
    validateResult
],incomeSave);

router.put('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('value', 'el nombre es obligatorio').not().isEmpty(),
    check('user', 'Id invalido user').isMongoId(),
    validateResult
],incomeUpdate);

router.delete('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],incomeDelete);

router.get('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],incomeSearch);

router.get('/', [
    validateJwt,    
    validateResult
], incomeAll);


module.exports = router;