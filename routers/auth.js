const { check } = require('express-validator')
const Router = require('express');
const { login } = require('../controller/auth');
const { validateResult } = require('../middlewares/validate');
const { isExistsEmail } = require('../helpers/valideteAuth');


const router = Router();


router.post('/', [
    check('email', 'La email es obligatoria').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email').custom(isExistsEmail),
    validateResult
],
    login);


module.exports = router;