const { check } = require('express-validator')
const Router = require('express');
const {  userPost, userPut, userDelete } = require('../controller/user');
const { validateJwt } = require('../middlewares/validateJwt');
const { validateResult } = require('../middlewares/validate');
const { isExistsEmailUser } = require('../helpers/validateUser');
const { isExistsEmail } = require('../helpers/valideteAuth');


const router = Router();


router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email').custom(isExistsEmailUser),
    validateResult
], userPost);
router.put('/:id', [
    validateJwt,
    check('id', 'id invalido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email').custom(isExistsEmail),
    validateResult
], userPut);
router.delete('/:id', [
    validateJwt,
    check('id', 'id invalido').isMongoId(),
    validateResult
], userDelete);


module.exports = router;