const express = require('express');
const fs = require('fs');
const print_api = express.Router();


// my controller
const authentication_controller = require('../controller/authentication');
const dashboard_controller = require('../controller/dashboard');
const user_default_controller = require('../controller/user_default');


const print_controller = require('../controller/print');

print_api.get('/print/:id/:type',print_controller.print_ticket);



module.exports = print_api;


