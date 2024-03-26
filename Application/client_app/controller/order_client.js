const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../../admin_app/lib/doc');
const { foreignDatas_GetAll } = require('../../admin_app/lib/default_lib');
const { db } = require('../../admin_app/lib/database');
const order_module = require('../../admin_app/lib/order_client');
const category_module = require('../../admin_app/lib/category');
const option_add_module = require('../../admin_app/lib/option_add');
const product_module = require('../../admin_app/lib/product');
const product_detail_module = require('../../admin_app/lib/product_detail');
const product_option_module = require('../../admin_app/lib/product_option');
const {order_client_get_products} = require("../../admin_app/lib/order_client");
const order_client_module = require("../../admin_app/lib/order_client");
const waiting_module = require('../../admin_app/lib/waiting');



const order_client_init = function (req,res) {

    let waiting_id,waiting_total,waiting_remaining;
    let dateNow = new Date().toISOString().slice(0, 10).replace('T', ' ');
    let timeNow = new Date().getHours();
    let toDay = new Date();
    toDay.setDate(toDay.getDate() - 1);
    let yesterday = toDay.toISOString().slice(0, 10).replace('T', ' ');

    waiting_module.waiting_get_filter_multi({waiting_date:[new Date().toISOString().slice(0, 10).replace('T', ' ')]},'and',function (err,result1) {
        if (err) console.log('error',err);

        waiting_module.waiting_get_filter_multi({waiting_date:[yesterday]},'and',function (err,result1_2) {
            if (err) console.log('error',err);

            if ( timeNow > 0 && timeNow < 6) {
                console.log('timenow',timeNow)
                if(result1_2.length == 0) {
                    waiting_module.waiting_add({waiting_date:yesterday,waiting_total : 1,waiting_remaining:1},function (err,result2) {
                        waiting_total = 1
                        waiting_id = result2.insertId;
                    })
                }
                else {
                    waiting_total = result1_2[0].waiting_total + 1;
                    waiting_remaining = result1_2[0].waiting_remaining + 1;
                    waiting_id = result1_2[0].waiting_id;
                }
            }
            else {
                if(result1.length == 0) {
                    waiting_module.waiting_add({waiting_date:dateNow,waiting_total : 1,waiting_remaining:1},function (err,result2) {
                        waiting_total = 1
                        waiting_id = result2.insertId;
                    })
                }
                else {
                    waiting_total = result1[0].waiting_total + 1;
                    waiting_remaining = result1[0].waiting_remaining + 1;
                    waiting_id = result1[0].waiting_id;
                }
            }


            waiting_module.waiting_update(waiting_id,{waiting_total:waiting_total,waiting_remaining:waiting_remaining},function (err,result3) {
                if (err) console.log('error',err);


                order_module.order_client_add({order_number:waiting_total,order_in:new Date(),order_statut:0,waiting_id:waiting_id},function (err,result4){
                    if (err) console.log('error',err);

                    // order_module.order_client_update(result4.insertId,{order_number:result4.insertId},function (err,result2){
                    //     if (err) console.log('error',err);

                    res.redirect('/order/'+result4.insertId)
                })

                // })
            })
        })
    })
};



const order_client_home = function (req,res) {

    let order_id = req.params.id;

    category_module.category_get_all(function (err,result1){
        if (err) console.log('error',err);

        for (let i = 0; i < result1.length; i++){
            product_module.product_get_filter('cat_id',result1[i].cat_id,function (err,cat_products){
                result1[i]['products'] = cat_products;
            })
        }

        order_module.order_client_get_one(order_id,function (err,result5){
            if (err) console.log('error',err);

            product_module.product_get_all(function (err,result2){
                if (err) console.log('error',err);

                console.log(order_id)
                order_module.order_client_get_products(order_id,function (err,result3){
                    if (err) console.log('error',err);

                    console.log("order detail : ",result3)

                    option_add_module.option_get_all_type(function (err,result4){
                        if (err) console.log('error',err);

                        console.log(result4)

                        if(req.baseUrl == "/api") {
                            res.send({ order_id:order_id, order_info : result5, category : result1, product: result2, order : result3, option_add : result4, err : err});
                        } else {
                            res.render('order_home',{ order_id:order_id, order_info : result5, category : result1, product: result2, order : result3, option_add : result4, err : err});
                        }
                    })
                })
            })
        })
    })
};



const order_product_add = function (req,res) {

    let resObj = {
        data : null, err : null
    };

    let reqObj = req.body;

    let dataInsert1 = new Object();
    Object.assign(dataInsert1, reqObj);
    delete dataInsert1.options_add;

    product_detail_module.product_detail_add(dataInsert1,function (err,result1){
        if (err) console.log('error',err);

        // console.log('product_detail_add result ',result1);

        // console.log("option add",reqObj.options_add)

        if (typeof(reqObj.options_add) !='undefined' && reqObj.options_add !=null && reqObj.options_add.length>0) {
            for (let i = 0; i < reqObj.options_add.length;i++){
                data_product_option = {detail_id : result1.insertId ,option_id:reqObj.options_add[i]};
                product_option_module.product_option_add(data_product_option, function (err,result2) {
                    if (err) console.log('error', err);

                    // console.log("result2",result2)
                });
            }
        }
        order_module.order_get_totalPrice(reqObj.order_id,function (err,result3) {
            if (err) console.log('error',err);
            console.log("result3",result3)

            order_module.order_client_update(reqObj.order_id,{order_total_price:result3[0].totalPrice},function (err,result4){
                if (err) console.log('error',err);

                resObj = {
                    data : {
                        product_add : result1
                    },
                    err : err
                };

                if(req.baseUrl == "/api") {
                    res.send(resObj);
                } else {
                    res.render('order_home',resObj);
                }

            })
        })
    })

};


const order_product_remove = function (req,res) {

    let resObj = {
        data : null, err : null
    };

    let totalPrice = 0;
    const detail_id = req.params.id;

    product_detail_module.product_detail_get_one(detail_id,function (err,result0){
        if (err) console.log('error',err);

        const order_id = result0[0].order_id;

        product_option_module.product_option_delete(detail_id,function (err,result1){
            if (err) console.log('error',err);

            product_detail_module.product_detail_delete(detail_id,function (err,result2){
                if (err) console.log('error',err);


                order_module.order_get_totalPrice(order_id,function (err,result3) {
                    if (err) console.log('error',err);

                    console.log('result3',result3)

                    if (result3.length>0){
                        console.log("new price")
                        totalPrice = result3[0].totalPrice;
                    }

                    console.log('totalPrice',totalPrice)
                    order_module.order_client_update(order_id,{order_total_price:totalPrice},function (err,result4){
                        if (err) console.log('error',err);

                        // waiting check erreur last product

                        // console.log('product_detail_remove result ',result1);

                        resObj = {
                            data : {
                                product_option : result1,
                                product_detail : result2,
                                order_totalPrice : totalPrice
                            },
                            err : err
                        };

                        if(req.baseUrl == "/api") {
                            res.send(resObj);
                        } else {
                            res.redirect("order/"+location.pathname);// waiting ............................////////////////////////////////////
                        }

                    })
                })
            })
        })
    })

};


const display_home = function (req,res) {

    order_module.order_client_get_all(function (err,result1) {
        // order_module.order_client_get_filter('order_statut',2,function (err,result1) {
        if (err) console.log('error',err);

        if(req.baseUrl == "/api") {
            res.send({order : result1,err : err});
        } else {
            res.render('display_home',{order : result1,err : err});
        }
    })
};




const order_client_delete = function (req,res) {

    let resObj = {
        data : null, err : null
    };

    const order_id = req.params.id;

    order_module.order_client_delete(order_id,function (err,result1) {
        if (err) console.log('error',err);

        resObj = {
            data : result1,
            err : err
        };

        if(req.baseUrl == "/api") {
            res.send(resObj);
        } else {
            res.redirect("/");
        }
    })
};


const order_client_valid = function (req,res) {
    const id = req.params.id;
    order_client_module.order_client_update(id,{order_statut : 1},function (err,result1) {
        if (err) console.log('error',err);
        console.log('update_result',result1);
        if(req.baseUrl == "/api") {
            res.send({update_result : result1, err : err, session : req.session});
        } else {
            res.redirect('order_client/admin/list');
        }
    });
};


const order_client_cancel = function (req,res) {
    const id = req.params.id;
    order_client_module.order_client_update(id,{order_statut : 3},function (err,result1) {
        if (err) console.log('error',err);
        console.log('update_result',result1);
        if(req.baseUrl == "/api") {
            res.send({update_result : result1, err : err, session : req.session});
        } else {
            res.redirect('order_client/admin/list');
        }
    });
};



exports.order_client_init = order_client_init
exports.order_client_home = order_client_home
exports.order_client_delete = order_client_delete
exports.display_home = display_home
exports.order_product_add = order_product_add
exports.order_product_remove = order_product_remove
exports.order_client_valid = order_client_valid
exports.order_client_cancel = order_client_cancel
