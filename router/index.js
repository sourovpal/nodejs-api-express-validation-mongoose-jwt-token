const express = require('express');
const router = express.Router();
const os = require('os');

const { query } = require('express-validator');

const JwtTokenVerify = require('../middlewares/JwtTokenVerify');
const AuthController = require('../controllers/AuthController');

const {AdminCreateValidation, AdminLoginValidation} = require('../validations/AdminValidation');


router.post('/sign-up', AdminCreateValidation,  AuthController.create);

router.post('/sign-in', AdminLoginValidation, AuthController.login);

/*==========================================================================
                                Middleware
============================================================================*/

router.use(JwtTokenVerify);

/*==========================================================================
                                Middleware End
============================================================================*/

router.get('/sign-out', AuthController.logout);

router.get('/dashboard', async(req, res)=>{

    res.send("Success");

})

module.exports = router;