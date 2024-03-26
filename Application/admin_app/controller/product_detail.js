const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const product_detail_module = require('../lib/product_detail');


const product_detail_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_detail_module.product_detail_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_detail_module.product_detail_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product_detail : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_detail_list_page',{product_detail : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product_detail:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_detail_list_page',{product_detail : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_detail_list_page = product_detail_list_page


const product_detail_list = function (req,res) {
     product_detail_module.product_detail_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({product_detail : result1, err : err, session : req.session});
         } else {
         res.render('product_detail_list',{product_detail : result1, err : err, session : req.session});
         }
});
};



exports.product_detail_list = product_detail_list


const product_detail_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_detail_module.product_detail_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_detail_module.product_detail_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product_detail : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_detail_list_page_admin',{product_detail : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product_detail:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_detail_list_page_admin',{product_detail : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_detail_list_page_admin = product_detail_list_page_admin


const product_detail_list_admin = function (req,res) {
product_detail_module.product_detail_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_detail : result1, err : err, session : req.session});
     } else {
     res.render('product_detail_list_admin',{product_detail : result1, err : err, session : req.session});
     }
  });
};



exports.product_detail_list_admin = product_detail_list_admin


const product_detail_details = function (req,res) {
const id = req.params.id;
product_detail_module.product_detail_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_detail : result1, err : err, session : req.session});
     } else {
     res.render('product_detail_details',{product_detail : result1, err : err, session : req.session});
     }
});
};



exports.product_detail_details = product_detail_details


const product_detail_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'product_detail',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     product_detail_module.product_detail_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({product_detail : result1, err : err, session : req.session});
         } else {
         res.render('product_detail_edit',{product_detail : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.product_detail_edit = product_detail_edit


const product_detail_edit_save = function (req,res) {
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
      product_detail_module.product_detail_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./../docDyn/public/img/product_detail/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./../docDyn/public/img/product_detail/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             product_detail_module.product_detail_update(id,{product_detail_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/product_detail/admin/page/1');
     }
});
    })
};



exports.product_detail_edit_save = product_detail_edit_save


const product_detail_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'product_detail',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('product_detail_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.product_detail_add = product_detail_add


const product_detail_add_save = function (req,res) {
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
product_detail_module.product_detail_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./../docDyn/public/img/product_detail/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/product_detail/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    product_detail_module.product_detail_update(result1.insertId,{product_detail_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/product_detail/admin/page/1');
     }
});
    })
};



exports.product_detail_add_save = product_detail_add_save


const product_detail_delete = function (req,res) {
const id = req.params.id;
product_detail_module.product_detail_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/product_detail/admin/page/1');
     }
});
};



exports.product_detail_delete = product_detail_delete


const product_detail_filter = function (req,res) {
const filter = req.params.filter;
product_detail_module.product_detail_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_detail : result1, err : err, session : req.session});
     } else {
     res.render('product_detail_list_admin',{product_detail : result1, err : err, session : req.session});
     }
});
};



exports.product_detail_filter = product_detail_filter


