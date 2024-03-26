const fs = require('fs');
const doc_module = require('./../docDyn/lib/doc');
const { foreignDatas_GetAll } = require('./../docDyn/lib/default_lib');
const { db } = require('./../docDyn/lib/database');
const order_module = require('./../docDyn/lib/order_client');
const category_module = require('./../docDyn/lib/category');
const option_add_module = require('./../docDyn/lib/option_add');
const product_module = require('./../docDyn/lib/product');
const product_detail_module = require('./../docDyn/lib/product_detail');
const product_option_module = require('./../docDyn/lib/product_option');


order_module.order_client_get_products(6,(err,data)=>{
    console.log(err)
    console.log(data)
})
