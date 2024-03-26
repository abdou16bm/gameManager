const express = require('express');
const fs = require('fs');
const order_client_router = express.Router();


// my controller
const authentication_controller = require('../controller/authentication');
const dashboard_controller = require('../controller/dashboard');
const user_default_controller = require('../controller/user_default');


const order_client_controller = require('../controller/order_client');

order_client_router.get('/order_client/list',authentication_controller.isAuthenticated,order_client_controller.order_client_list);
order_client_router.get('/order_client/page/:page',authentication_controller.isAuthenticated,order_client_controller.order_client_list_page);
order_client_router.get('/order_client/admin/list',authentication_controller.isAuthenticated,order_client_controller.order_client_list_admin);
order_client_router.get('/order_client/admin/page/:page',authentication_controller.isAuthenticated,order_client_controller.order_client_list_page_admin);
order_client_router.get('/order_client/:id/details',authentication_controller.isAuthenticated,order_client_controller.order_client_details);
order_client_router.get('/order_client/:id/edit',authentication_controller.isAuthenticated,order_client_controller.order_client_edit);
order_client_router.post('/order_client/:id/edit',authentication_controller.isAuthenticated,order_client_controller.order_client_edit_save);
order_client_router.get('/order_client/add',authentication_controller.isAuthenticated,order_client_controller.order_client_add);
order_client_router.post('/order_client/add',authentication_controller.isAuthenticated,order_client_controller.order_client_add_save);
order_client_router.get('/order_client/:id/delete',authentication_controller.isAuthenticated,order_client_controller.order_client_delete);
order_client_router.get('/order_client/list/:filter',authentication_controller.isAuthenticated,order_client_controller.order_client_filter);
order_client_router.get('/order_client/:id/confirm',authentication_controller.isAuthenticated,order_client_controller.order_client_confirm);
order_client_router.get('/order_client/:id/valid',authentication_controller.isAuthenticated,order_client_controller.order_client_valid);
order_client_router.get('/order_client/:id/cancel',authentication_controller.isAuthenticated,order_client_controller.order_client_cancel);

order_client_router.get('/cash_register/admin/page/:page',authentication_controller.isAuthenticated,order_client_controller.cash_register_list_page_admin);
order_client_router.get('/cash_register/details/:waiting/page/:page',authentication_controller.isAuthenticated,order_client_controller.cash_register_details);



order_client_router.get('/order/new',order_client_controller.order_client_init);
order_client_router.get('/order/:id',order_client_controller.order_client_home);
order_client_router.get('/order/:id/delete',order_client_controller.order_client_delete);
order_client_router.get('/display/',order_client_controller.display_home);
order_client_router.post('/order/product_add/',order_client_controller.order_product_add);
order_client_router.get('/order/product_remove/:id',order_client_controller.order_product_remove);


module.exports = order_client_router;


