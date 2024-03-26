const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const product_option_module = require('../lib/product_option');


const product_option_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_option_module.product_option_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_option_module.product_option_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product_option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_option_list_page',{product_option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product_option:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_option_list_page',{product_option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_option_list_page = product_option_list_page


const product_option_list = function (req,res) {
     product_option_module.product_option_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({product_option : result1, err : err, session : req.session});
         } else {
         res.render('product_option_list',{product_option : result1, err : err, session : req.session});
         }
});
};



exports.product_option_list = product_option_list


const product_option_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_option_module.product_option_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_option_module.product_option_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product_option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_option_list_page_admin',{product_option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product_option:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_option_list_page_admin',{product_option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_option_list_page_admin = product_option_list_page_admin


const product_option_list_admin = function (req,res) {
product_option_module.product_option_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_option : result1, err : err, session : req.session});
     } else {
     res.render('product_option_list_admin',{product_option : result1, err : err, session : req.session});
     }
  });
};



exports.product_option_list_admin = product_option_list_admin


const product_option_details = function (req,res) {
const id = req.params.id;
product_option_module.product_option_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_option : result1, err : err, session : req.session});
     } else {
     res.render('product_option_details',{product_option : result1, err : err, session : req.session});
     }
});
};



exports.product_option_details = product_option_details


const product_option_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'product_option',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     product_option_module.product_option_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({product_option : result1, err : err, session : req.session});
         } else {
         res.render('product_option_edit',{product_option : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.product_option_edit = product_option_edit


const product_option_edit_save = function (req,res) {
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
      product_option_module.product_option_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./../docDyn/public/img/product_option/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./../docDyn/public/img/product_option/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             product_option_module.product_option_update(id,{product_option_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/product_option/admin/page/1');
     }
});
    })
};



exports.product_option_edit_save = product_option_edit_save


const product_option_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'product_option',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('product_option_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.product_option_add = product_option_add


const product_option_add_save = function (req,res) {
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
product_option_module.product_option_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./../docDyn/public/img/product_option/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/product_option/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    product_option_module.product_option_update(result1.insertId,{product_option_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/product_option/admin/page/1');
     }
});
    })
};



exports.product_option_add_save = product_option_add_save


const product_option_delete = function (req,res) {
const id = req.params.id;
product_option_module.product_option_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/product_option/admin/page/1');
     }
});
};



exports.product_option_delete = product_option_delete


const product_option_filter = function (req,res) {
const filter = req.params.filter;
product_option_module.product_option_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_option : result1, err : err, session : req.session});
     } else {
     res.render('product_option_list_admin',{product_option : result1, err : err, session : req.session});
     }
});
};



exports.product_option_filter = product_option_filter


