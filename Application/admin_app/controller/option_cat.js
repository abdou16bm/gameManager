const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const option_cat_module = require('../lib/option_cat');


const option_cat_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
option_cat_module.option_cat_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
option_cat_module.option_cat_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({option_cat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('option_cat_list_page',{option_cat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({option_cat:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('option_cat_list_page',{option_cat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.option_cat_list_page = option_cat_list_page


const option_cat_list = function (req,res) {
     option_cat_module.option_cat_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({option_cat : result1, err : err, session : req.session});
         } else {
         res.render('option_cat_list',{option_cat : result1, err : err, session : req.session});
         }
});
};



exports.option_cat_list = option_cat_list


const option_cat_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
option_cat_module.option_cat_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
option_cat_module.option_cat_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({option_cat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('option_cat_list_page_admin',{option_cat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({option_cat:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('option_cat_list_page_admin',{option_cat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.option_cat_list_page_admin = option_cat_list_page_admin


const option_cat_list_admin = function (req,res) {
option_cat_module.option_cat_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({option_cat : result1, err : err, session : req.session});
     } else {
     res.render('option_cat_list_admin',{option_cat : result1, err : err, session : req.session});
     }
  });
};



exports.option_cat_list_admin = option_cat_list_admin


const option_cat_details = function (req,res) {
const id = req.params.id;
option_cat_module.option_cat_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({option_cat : result1, err : err, session : req.session});
     } else {
     res.render('option_cat_details',{option_cat : result1, err : err, session : req.session});
     }
});
};



exports.option_cat_details = option_cat_details


const option_cat_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'option_cat',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     option_cat_module.option_cat_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({option_cat : result1, err : err, session : req.session});
         } else {
         res.render('option_cat_edit',{option_cat : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.option_cat_edit = option_cat_edit


const option_cat_edit_save = function (req,res) {
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
      option_cat_module.option_cat_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./../docDyn/public/img/option_cat/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./../docDyn/public/img/option_cat/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             option_cat_module.option_cat_update(id,{option_cat_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/option_cat/admin/page/1');
     }
});
    })
};



exports.option_cat_edit_save = option_cat_edit_save


const option_cat_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'option_cat',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('option_cat_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.option_cat_add = option_cat_add


const option_cat_add_save = function (req,res) {
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
option_cat_module.option_cat_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./../docDyn/public/img/option_cat/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/option_cat/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    option_cat_module.option_cat_update(result1.insertId,{option_cat_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/option_cat/admin/page/1');
     }
});
    })
};



exports.option_cat_add_save = option_cat_add_save


const option_cat_delete = function (req,res) {
const id = req.params.id;
option_cat_module.option_cat_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/option_cat/admin/page/1');
     }
});
};



exports.option_cat_delete = option_cat_delete


const option_cat_filter = function (req,res) {
const filter = req.params.filter;
option_cat_module.option_cat_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({option_cat : result1, err : err, session : req.session});
     } else {
     res.render('option_cat_list_admin',{option_cat : result1, err : err, session : req.session});
     }
});
};



exports.option_cat_filter = option_cat_filter


