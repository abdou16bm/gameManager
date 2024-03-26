const express = require('express');
const order_client_router = express.Router();


// my controller
//  const authentication_controller = require('../../admin_app/controller/authentication');
//  const dashboard_controller = require('../../admin_app/controller/dashboard');
//  const user_default_controller = require('../../admin_app/controller/user_default');


const order_client_controller = require('../controller/order_client');
const authentication_controller = require("../../admin_app/controller/authentication");

order_client_router.get('/order/new',order_client_controller.order_client_init);
order_client_router.get('/order/:id',order_client_controller.order_client_home);
order_client_router.get('/order/:id/delete',order_client_controller.order_client_delete);
order_client_router.get('/display/',order_client_controller.display_home);
order_client_router.post('/order/product_add/',order_client_controller.order_product_add);
order_client_router.get('/order/product_remove/:id',order_client_controller.order_product_remove);
order_client_router.get('/order_client/:id/valid',authentication_controller.isAuthenticated,order_client_controller.order_client_valid);
order_client_router.get('/order_client/:id/cancel',authentication_controller.isAuthenticated,order_client_controller.order_client_cancel);



module.exports = order_client_router;


