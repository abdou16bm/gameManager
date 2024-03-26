const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../lib/doc');
const { foreignDatas_GetAll } = require('../lib/default_lib');
const { db } = require('../lib/database');
const order_client_module = require('../lib/order_client');
const product_module = require("../lib/product");
const category_module = require("../lib/category");
const order_module = require("../lib/order_client");
const option_add_module = require("../lib/option_add");
const product_detail_module = require("../lib/product_detail");
const product_option_module = require("../lib/product_option");
const waiting_module = require("../lib/waiting");
const user_module = require("../lib/user")


const order_client_list_page = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    order_client_module.order_client_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            order_client_module.order_client_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('order_client_list_page',{order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({order_client:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('order_client_list_page',{order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.order_client_list_page = order_client_list_page


const order_client_list = function (req,res) {
    order_client_module.order_client_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({order_client : result1, err : err, session : req.session});
        } else {
            res.render('order_client_list',{order_client : result1, err : err, session : req.session});
        }
    });
};



exports.order_client_list = order_client_list


const order_client_list_page_admin = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    order_client_module.order_client_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            order_client_module.order_client_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('order_client_list_page_admin',{order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({order_client:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('order_client_list_page_admin',{order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.order_client_list_page_admin = order_client_list_page_admin



const cash_register_list_page_admin = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    order_client_module.cash_register_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1.length > 0 ) {count_page = result1[0].count_p}
            order_client_module.cash_register_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('cash_register_list_page_admin',{order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({order_client:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('cash_register_list_page_admin',{order_client : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.cash_register_list_page_admin = cash_register_list_page_admin


const cash_register_details = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    let waiting_id = req.params.waiting;
    let filter_field = "";
    let filter_data = ""

    if (typeof(req.query.order) != 'undefined' && req.query.order != null && req.query.order != "") {
        
        filter_field = "oc.order_id"
        filter_data =  req.query.order

    } 
    else if (typeof(req.query.userOrder) != 'undefined' && req.query.userOrder != null && req.query.userOrder != "") {
        
        filter_field = "oc.user_id"
        filter_data =  req.query.userOrder

    } 

    waiting_module.waiting_get_one(waiting_id,function (err,result) {
        
        user_module.user_get_all(function (err,result0) {
            if (err) console.log('error',err);
    
            order_client_module.cash_register_details_count_page_filter(limit_page,waiting_id,filter_field,filter_data,function (err,result1) {
                if (err) console.log('err : ',err) ;
                if (result1.length)
                {
                    if (result1[0].count_p > 0) count_page = result1[0].count_p;
                    order_client_module.cash_register_details_get_all_limit_filter(waiting_id,current_page*limit_page,limit_page,'table_pk','DESC',filter_field,filter_data,function (err,result2) {
                        if (err) console.log('error',err);
        
                        if(req.baseUrl == "/api") {
                            res.send({order_client : result2, user : result0, waiting : result, info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                        } else {
                            res.render('cash_register_details',{order_client : result2, user : result0, waiting : result,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                        }
                    })
                }
                else {
                    if(req.baseUrl == "/api") {
                        res.send({order_client:[], user : result0, waiting : result,info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
                    } else {
                        res.render('cash_register_details',{order_client : result2, user : result0, waiting : result,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                    }
                }
            })
        
        })


    })

    

    
};



exports.cash_register_details = cash_register_details


const order_client_list_admin = function (req,res) {


    order_client_module.order_client_get_filter('order_statut',1,function (err,result1) {
        if (err) console.log('error',err);

        for (let i = 0; i < result1.length; i++){
            order_client_module.order_client_get_products(result1[i].order_id,function (err,order_products){
                result1[i]['products'] = order_products;
            })
        }
        order_client_module.order_client_get_filter('order_statut',2,function (err,result2) {
            if (err) console.log('error',err);

            for (let i = 0; i < result2.length; i++){
                order_client_module.order_client_get_products(result2[i].order_id,function (err,order_products){
                    result2[i]['products'] = order_products;
                })
            }

            order_client_module.order_client_get_filter('order_statut',100,function (err,result3) {

                console.log('order_client : ',result1)
                console.log('order_client_valid : ',result2)

                if(req.baseUrl == "/api") {
                    res.send({order_client : result1, order_client_valid : result2, err : err, session : req.session});
                } else {
                    res.render('order_client_list_admin',{order_client : result1, order_client_valid : result2, err : err, session : req.session});
                }
            });
        });
    });
};



exports.order_client_list_admin = order_client_list_admin


const order_client_details = function (req,res) {

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
                            res.render('order_client_details',{ order_id:order_id, order_info : result5, category : result1, product: result2, order : result3, option_add : result4, err : err});
                        }
                    })
                })
            })
        })
    })
}



exports.order_client_details = order_client_details


const order_client_edit = function (req,res) {
    const id = req.params.id;
    foreignDatas_GetAll(db,db.config.database,'order_client',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        order_client_module.order_client_get_one(id,function (err,result1) {
            if (err) console.log('error',err);
            if(req.baseUrl == "/api") {
                res.send({order_client : result1, err : err, session : req.session});
            } else {
                res.render('order_client_edit',{order_client : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
            }
        });
    });
};



exports.order_client_edit = order_client_edit


const order_client_edit_save = function (req,res) {
    const id = req.params.id;
//let input = JSON.parse(JSON.stringify(req.body));
//let data_update = input
    const options = {
        multiples : true,
        uploadDir: './../uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let input = fields;
        if (typeof input.user_id != 'undefined')  input.user_id = req.session.userid;

        let data_update =input;
        order_client_module.order_client_update(id,data_update,function (err,result1) {
            if (err) console.log('error',err);
            doc_module.uploadFile('./../docDyn/public/img/order_client/',id,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/order_client/',id,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    order_client_module.order_client_update(id,{order_client_pic_count:count2})

                })
            })
            if(req.baseUrl == "/api") {
                res.send({update_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/order_client/admin/page/1');
            }
        });
    })
};



exports.order_client_edit_save = order_client_edit_save


const order_client_add = function (req,res) {
    foreignDatas_GetAll(db,db.config.database,'order_client',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        res.render('order_client_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
    });
};



exports.order_client_add = order_client_add


const order_client_add_save = function (req,res) {
//let input = JSON.parse(JSON.stringify(req.body));
//let data_insert = input
    const options = {
        multiples : true,
        uploadDir: './../uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let input = fields;
        if (typeof input.user_id != 'undefined')  input.user_id = req.session.userid;

        let data_insert =input;
        order_client_module.order_client_add(data_insert,function (err,result1) {
            if (err) console.log('error',err);
            doc_module.uploadFile('./../docDyn/public/img/order_client/',result1.insertId,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/order_client/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    order_client_module.order_client_update(result1.insertId,{order_client_pic_count:count2})

                });             });
            if(req.baseUrl == "/api") {
                res.send({insert_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/order_client/admin/page/1');
            }
        });
    })
};



exports.order_client_add_save = order_client_add_save


const order_client_delete = function (req,res) {
    const id = req.params.id;
    order_client_module.order_client_delete(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({delete_result : result1, err : err, session : req.session});
        } else {
            res.redirect('/order_client/admin/page/1');
        }
    });
};



exports.order_client_delete = order_client_delete


const order_client_filter = function (req,res) {
    const filter = req.params.filter;
    order_client_module.order_client_filter(filter,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({order_client : result1, err : err, session : req.session});
        } else {
            res.render('order_client_list_admin',{order_client : result1, err : err, session : req.session});
        }
    });
};



exports.order_client_filter = order_client_filter


const order_client_confirm = function (req,res) {
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

exports.order_client_confirm = order_client_confirm



const order_client_valid = function (req,res) {
    const id = req.params.id;
    let user = req.session.userid
    order_client_module.order_client_update(id,{order_statut : 2,user_id : user},function (err,result1) {
        if (err) console.log('error',err);
        console.log('update_result',result1);
        if(req.baseUrl == "/api") {
            res.send({update_result : result1, err : err, session : req.session});
        } else {
            res.redirect('order_client/admin/list');
        }
    });
};

exports.order_client_valid = order_client_valid



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

exports.order_client_cancel = order_client_cancel



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

                    res.redirect('/order_client/'+result4.insertId+'/details')
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
        if (err) console.log('error',err);

        if(req.baseUrl == "/api") {
            res.send({order : result1,err : err});
        } else {
            res.render('display_home',{order : result1,err : err});
        }
    })
};




exports.order_client_init = order_client_init
exports.order_client_home = order_client_home
exports.display_home = display_home
exports.order_product_add = order_product_add
exports.order_product_remove = order_product_remove
