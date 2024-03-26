const express = require('express');
 const fs = require('fs');
 const product_detail_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const product_detail_controller = require('../controller/product_detail');

 product_detail_router.get('/product_detail/list',authentication_controller.isAuthenticated,product_detail_controller.product_detail_list);
 product_detail_router.get('/product_detail/page/:page',authentication_controller.isAuthenticated,product_detail_controller.product_detail_list_page);
 product_detail_router.get('/product_detail/admin/list',authentication_controller.isAuthenticated,product_detail_controller.product_detail_list_admin);
 product_detail_router.get('/product_detail/admin/page/:page',authentication_controller.isAuthenticated,product_detail_controller.product_detail_list_page_admin);
 product_detail_router.get('/product_detail/:id/details',authentication_controller.isAuthenticated,product_detail_controller.product_detail_details);
 product_detail_router.get('/product_detail/:id/edit',authentication_controller.isAuthenticated,product_detail_controller.product_detail_edit);
 product_detail_router.post('/product_detail/:id/edit',authentication_controller.isAuthenticated,product_detail_controller.product_detail_edit_save);
 product_detail_router.get('/product_detail/add',authentication_controller.isAuthenticated,product_detail_controller.product_detail_add);
 product_detail_router.post('/product_detail/add',authentication_controller.isAuthenticated,product_detail_controller.product_detail_add_save);
 product_detail_router.get('/product_detail/:id/delete',authentication_controller.isAuthenticated,product_detail_controller.product_detail_delete);
 product_detail_router.get('/product_detail/list/:filter',authentication_controller.isAuthenticated,product_detail_controller.product_detail_filter);



 module.exports = product_detail_router;


