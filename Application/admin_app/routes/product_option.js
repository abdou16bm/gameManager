const express = require('express');
 const fs = require('fs');
 const product_option_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const product_option_controller = require('../controller/product_option');

 product_option_router.get('/product_option/list',authentication_controller.isAuthenticated,product_option_controller.product_option_list);
 product_option_router.get('/product_option/page/:page',authentication_controller.isAuthenticated,product_option_controller.product_option_list_page);
 product_option_router.get('/product_option/admin/list',authentication_controller.isAuthenticated,product_option_controller.product_option_list_admin);
 product_option_router.get('/product_option/admin/page/:page',authentication_controller.isAuthenticated,product_option_controller.product_option_list_page_admin);
 product_option_router.get('/product_option/:id/details',authentication_controller.isAuthenticated,product_option_controller.product_option_details);
 product_option_router.get('/product_option/:id/edit',authentication_controller.isAuthenticated,product_option_controller.product_option_edit);
 product_option_router.post('/product_option/:id/edit',authentication_controller.isAuthenticated,product_option_controller.product_option_edit_save);
 product_option_router.get('/product_option/add',authentication_controller.isAuthenticated,product_option_controller.product_option_add);
 product_option_router.post('/product_option/add',authentication_controller.isAuthenticated,product_option_controller.product_option_add_save);
 product_option_router.get('/product_option/:id/delete',authentication_controller.isAuthenticated,product_option_controller.product_option_delete);
 product_option_router.get('/product_option/list/:filter',authentication_controller.isAuthenticated,product_option_controller.product_option_filter);



 module.exports = product_option_router;


