const express = require('express');
 const fs = require('fs');
 const option_cat_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const option_cat_controller = require('../controller/option_cat');

 option_cat_api.get('/option_cat/list',authentication_controller.isAuthenticated,option_cat_controller.option_cat_list);
 option_cat_api.get('/option_cat/page/:page',authentication_controller.isAuthenticated,option_cat_controller.option_cat_list_page);
 option_cat_api.get('/option_cat/admin/list',authentication_controller.isAuthenticated,option_cat_controller.option_cat_list_admin);
 option_cat_api.get('/option_cat/admin/page/:page',authentication_controller.isAuthenticated,option_cat_controller.option_cat_list_page_admin);
 option_cat_api.get('/option_cat/:id/details',authentication_controller.isAuthenticated,option_cat_controller.option_cat_details);
 option_cat_api.get('/option_cat/:id/edit',authentication_controller.isAuthenticated,option_cat_controller.option_cat_edit);
 option_cat_api.post('/option_cat/:id/edit',authentication_controller.isAuthenticated,option_cat_controller.option_cat_edit_save);
 option_cat_api.get('/option_cat/add',authentication_controller.isAuthenticated,option_cat_controller.option_cat_add);
 option_cat_api.post('/option_cat/add',authentication_controller.isAuthenticated,option_cat_controller.option_cat_add_save);
 option_cat_api.get('/option_cat/:id/delete',authentication_controller.isAuthenticated,option_cat_controller.option_cat_delete);
 option_cat_api.get('/option_cat/list/:filter',authentication_controller.isAuthenticated,option_cat_controller.option_cat_filter);



 module.exports = option_cat_api;


