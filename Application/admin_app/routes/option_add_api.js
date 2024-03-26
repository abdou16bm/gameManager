const express = require('express');
const fs = require('fs');
const option_add_api = express.Router();


// my controller
const authentication_controller = require('../controller/authentication');
const dashboard_controller = require('../controller/dashboard');
const user_default_controller = require('../controller/user_default');


const option_controller = require('../controller/option_add');

option_add_api.get('/option_add/list',authentication_controller.isAuthenticated,option_controller.option_list);
option_add_api.get('/option_add/page/:page',authentication_controller.isAuthenticated,option_controller.option_list_page);
option_add_api.get('/option_add/admin/list',authentication_controller.isAuthenticated,option_controller.option_list_admin);
option_add_api.get('/option_add/admin/page/:page',authentication_controller.isAuthenticated,option_controller.option_list_page_admin);
option_add_api.get('/option_add/:id/details',authentication_controller.isAuthenticated,option_controller.option_details);
option_add_api.get('/option_add/:id/edit',authentication_controller.isAuthenticated,option_controller.option_edit);
option_add_api.post('/option_add/:id/edit',authentication_controller.isAuthenticated,option_controller.option_edit_save);
option_add_api.get('/option_add/add',authentication_controller.isAuthenticated,option_controller.option_add);
option_add_api.post('/option_add/add',authentication_controller.isAuthenticated,option_controller.option_add_save);
option_add_api.get('/option_add/:id/delete',authentication_controller.isAuthenticated,option_controller.option_delete);
option_add_api.get('/option_add/list/:filter',authentication_controller.isAuthenticated,option_controller.option_filter);



module.exports = option_add_api;


