const express = require('express');
const fs = require('fs');
const option_router = express.Router();


// my controller
const authentication_controller = require('../controller/authentication');
const dashboard_controller = require('../controller/dashboard');
const user_default_controller = require('../controller/user_default');


const option_controller = require('../controller/option_add');

option_router.get('/option_add/list',authentication_controller.isAuthenticated,option_controller.option_list);
option_router.get('/option_add/page/:page',authentication_controller.isAuthenticated,option_controller.option_list_page);
option_router.get('/option_add/admin/list',authentication_controller.isAuthenticated,option_controller.option_list_admin);
option_router.get('/option_add/admin/page/:page',authentication_controller.isAuthenticated,option_controller.option_list_page_admin);
option_router.get('/option_add/:id/details',authentication_controller.isAuthenticated,option_controller.option_details);
option_router.get('/option_add/:id/edit',authentication_controller.isAuthenticated,option_controller.option_edit);
option_router.post('/option_add/:id/edit',authentication_controller.isAuthenticated,option_controller.option_edit_save);
option_router.get('/option_add/add',authentication_controller.isAuthenticated,option_controller.option_add);
option_router.post('/option_add/add',authentication_controller.isAuthenticated,option_controller.option_add_save);
option_router.get('/option_add/:id/delete',authentication_controller.isAuthenticated,option_controller.option_delete);
option_router.get('/option_add/list/:filter',authentication_controller.isAuthenticated,option_controller.option_filter);



module.exports = option_router;


