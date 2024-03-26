const express = require('express');
const fs = require('fs');
const home_router = express.Router();


// my controller
const authentication_controller = require('../../admin_app/controller/authentication');
const dashboard_controller = require('../../admin_app/controller/dashboard');
const user_default_controller = require('../../admin_app/controller/user_default');


const home_controller = require('../controller/home');

home_router.get('/', home_controller.home);
// home_router.get('/', user_default_controller.user_login);
// home_router.post('/', user_default_controller.user_login_check);
// home_router.get('/logout', user_default_controller.user_logout);



module.exports = home_router;


