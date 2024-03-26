const express = require('express');
 const fs = require('fs');
 const waiting_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const waiting_controller = require('../controller/waiting');

 waiting_router.get('/waiting/list',authentication_controller.isAuthenticated,waiting_controller.waiting_list);
 waiting_router.get('/waiting/page/:page',authentication_controller.isAuthenticated,waiting_controller.waiting_list_page);
 waiting_router.get('/waiting/admin/list',authentication_controller.isAuthenticated,waiting_controller.waiting_list_admin);
 waiting_router.get('/waiting/admin/page/:page',authentication_controller.isAuthenticated,waiting_controller.waiting_list_page_admin);
 waiting_router.get('/waiting/:id/details',authentication_controller.isAuthenticated,waiting_controller.waiting_details);
 waiting_router.get('/waiting/:id/edit',authentication_controller.isAuthenticated,waiting_controller.waiting_edit);
 waiting_router.post('/waiting/:id/edit',authentication_controller.isAuthenticated,waiting_controller.waiting_edit_save);
 waiting_router.get('/waiting/add',authentication_controller.isAuthenticated,waiting_controller.waiting_add);
 waiting_router.post('/waiting/add',authentication_controller.isAuthenticated,waiting_controller.waiting_add_save);
 waiting_router.get('/waiting/:id/delete',authentication_controller.isAuthenticated,waiting_controller.waiting_delete);
 waiting_router.get('/waiting/list/:filter',authentication_controller.isAuthenticated,waiting_controller.waiting_filter);



 module.exports = waiting_router;


