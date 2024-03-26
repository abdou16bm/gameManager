const express = require('express');
const fs = require('fs');
const print_api = express.Router();


// my controller
// const authentication_controller = require('../../admin_app/controller/authentication');
// const user_default_controller = require('../../admin_app/controller/user_default');


const print_controller = require('../controller/print');

print_api.get('/print/test',print_controller.print_test);
print_api.get('/print/:id/:type',print_controller.print_ticketGet);
print_api.post('/print/:id/:type',print_controller.print_ticket);


module.exports = print_api;


