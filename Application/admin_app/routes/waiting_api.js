const express = require('express');
 const fs = require('fs');
 const waiting_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const waiting_controller = require('../controller/waiting');

 waiting_api.get('/waiting/list',authentication_controller.isAuthenticated,waiting_controller.waiting_list);
 waiting_api.get('/waiting/page/:page',authentication_controller.isAuthenticated,waiting_controller.waiting_list_page);
 waiting_api.get('/waiting/admin/list',authentication_controller.isAuthenticated,waiting_controller.waiting_list_admin);
 waiting_api.get('/waiting/admin/page/:page',authentication_controller.isAuthenticated,waiting_controller.waiting_list_page_admin);
 waiting_api.get('/waiting/:id/details',authentication_controller.isAuthenticated,waiting_controller.waiting_details);
 waiting_api.get('/waiting/:id/edit',authentication_controller.isAuthenticated,waiting_controller.waiting_edit);
 waiting_api.post('/waiting/:id/edit',authentication_controller.isAuthenticated,waiting_controller.waiting_edit_save);
 waiting_api.get('/waiting/add',authentication_controller.isAuthenticated,waiting_controller.waiting_add);
 waiting_api.post('/waiting/add',authentication_controller.isAuthenticated,waiting_controller.waiting_add_save);
 waiting_api.get('/waiting/:id/delete',authentication_controller.isAuthenticated,waiting_controller.waiting_delete);
 waiting_api.get('/waiting/list/:filter',authentication_controller.isAuthenticated,waiting_controller.waiting_filter);



 module.exports = waiting_api;


