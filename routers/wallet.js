const {check} = require('express-validator');
const Router = require('express');
const { walletSave, walletUpdate, walletDelete, walletSearch, walletAll } = require('../controller/wallet');
const { validateResult } = require('../middlewares/validate');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();


router.post('/',[
    validateJwt,
    check('budget', 'El presupuesto es obligatorio').not().isEmpty(),
    check('user', 'Id invalido').isMongoId(),
    validateResult
],walletSave);

router.put('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    check('budget', 'El presupuesto es obligatorio').not().isEmpty(),
    validateResult
],walletUpdate);

router.delete('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],walletDelete);

router.get('/:id',[
    validateJwt,
    check('id', 'Id invalido').isMongoId(),
    validateResult
],walletSearch);

router.get('/', [
    validateJwt,    
    validateResult
], walletAll);


module.exports = router;