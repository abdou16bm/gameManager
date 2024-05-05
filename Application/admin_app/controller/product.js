const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../lib/doc');
const { foreignDatas_GetAll } = require('../lib/default_lib');
const { db } = require('../lib/database');
const product_module = require('../lib/product');
const category_module = require('../lib/category');
const option_add_module = require('../lib/option_add');
const product_option_limit_module = require('../lib/product_option_limit');


const product_list_page = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    product_module.product_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            product_module.product_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('product_list_page',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({product:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('product_list_page',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.product_list_page = product_list_page


const product_list = function (req,res) {
    product_module.product_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({product : result1, err : err, session : req.session});
        } else {
            res.render('product_list',{product : result1, err : err, session : req.session});
        }
    });
};



exports.product_list = product_list


const product_list_page_admin = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    product_module.product_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            product_module.product_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('product_list_page_admin',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({product:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('product_list_page_admin',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.product_list_page_admin = product_list_page_admin


const product_list_admin = function (req,res) {
    category_module.category_get_all(function (err,result1){
        if (err) console.log('error',err);
        product_module.product_get_all(function (err,result2) {
            if (err) console.log('error',err);
            option_add_module.option_get_all_type(function (err,result3){
                if (err) console.log('error',err);

                if(req.baseUrl == "/api") {
                    res.send({category:result1,product : result2, option_add:result3, err : err, session : req.session});
                } else {
                    res.render('product_list_admin',{category:result1,product : result2, option_add:result3, err : err, session : req.session});
                }
            })


        })
    })
};



exports.product_list_admin = product_list_admin


const product_details = function (req,res) {
    const id = req.params.id;
    product_module.product_get_one(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({product : result1, err : err, session : req.session});
        } else {
            res.render('product_details',{product : result1, err : err, session : req.session});
        }
    });
};



exports.product_details = product_details


const product_edit = function (req,res) {
    const id = req.params.id;
    foreignDatas_GetAll(db,db.config.database,'product',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        product_module.product_get_one(id,function (err,result1) {
            if (err) console.log('error',err);
            if(req.baseUrl == "/api") {
                res.send({product : result1, err : err, session : req.session});
            } else {
                res.render('product_edit',{product : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
            }
        });
    });
};



exports.product_edit = product_edit


const product_edit_save = function (req,res) {
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
        const { option_add_product } = input;
        delete data_update.option_add_product;

        product_module.product_update(id,data_update,function (err,result1) {
            if (err) console.log('error',err);

            console.log(option_add_product)

            product_option_limit_module.product_option_limit_delete(id)
            if (typeof(option_add_product) != 'undefined' && option_add_product.length){
                for (let i=0;i<option_add_product.length;i++){
                    product_option_limit_module.product_option_limit_add({product_id:id,option_id:option_add_product[i]})
                }
            }

            doc_module.uploadFile('./../docDyn/public/img/product/',id,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/product/',id,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    product_module.product_update(id,{product_pic_count:count2})

                })
            })
            if(req.baseUrl == "/api") {
                res.send({update_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/product/admin/list');
            }
        });
    })
};



exports.product_edit_save = product_edit_save


const product_add = function (req,res) {
    foreignDatas_GetAll(db,db.config.database,'product',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        res.render('product_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
    });
};



exports.product_add = product_add


const product_add_save = function (req,res) {
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
        data_insert["product_status"] = 1;
        const { option_add_product } = input;
        delete data_insert.option_add_product;

        product_module.product_add(data_insert,function (err,result1) {
            if (err) console.log('error',err);


            if (typeof(option_add_product) != 'undefined' && option_add_product.length){
                for (let i=0;i<option_add_product.length;i++){
                    product_option_limit_module.product_option_limit_add({product_id:result1.insertId,option_id:option_add_product[i]})
                }
            }

            doc_module.uploadFile('./../docDyn/public/img/product/',result1.insertId,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/product/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    product_module.product_update(result1.insertId,{product_pic_count:count2})

                });             });
            if(req.baseUrl == "/api") {
                res.send({insert_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/product/admin/list/');
            }
        });
    })
};



exports.product_add_save = product_add_save


const product_delete = function (req,res) {
    const id = req.params.id;
    product_module.product_delete(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({delete_result : result1, err : err, session : req.session});
        } else {
            res.redirect('/product/admin/list');
        }
    });
};



exports.product_delete = product_delete


const product_filter = function (req,res) {
    const filter = req.params.filter;
    product_module.product_filter(filter,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({product : result1, err : err, session : req.session});
        } else {
            res.render('product_list_admin',{product : result1, err : err, session : req.session});
        }
    });
};



exports.product_filter = product_filter



const product_status_update = function (req,res) {

    const idp = req.query.idp;
    const status = req.query.status

    console.log("status : ",status)

    if (

        typeof(idp) != "undefined" && idp != null && idp != "" 
        && typeof(status) != "undefined" && status != null && status != ""
    
    ) { 
        
        product_module.product_update(idp,{product_status : status},function (err,result1) {

            res.send({result_update : result1, err : err});

        });
      

    } else res.send({err : {code : "DATA_MISSED"}})

};



exports.product_status_update = product_status_update