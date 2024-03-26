const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const waiting_module = require('../lib/waiting');


const waiting_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
waiting_module.waiting_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
waiting_module.waiting_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({waiting : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('waiting_list_page',{waiting : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({waiting:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('waiting_list_page',{waiting : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.waiting_list_page = waiting_list_page


const waiting_list = function (req,res) {
     waiting_module.waiting_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({waiting : result1, err : err, session : req.session});
         } else {
         res.render('waiting_list',{waiting : result1, err : err, session : req.session});
         }
});
};



exports.waiting_list = waiting_list


const waiting_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
waiting_module.waiting_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
waiting_module.waiting_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({waiting : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('waiting_list_page_admin',{waiting : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({waiting:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('waiting_list_page_admin',{waiting : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.waiting_list_page_admin = waiting_list_page_admin


const waiting_list_admin = function (req,res) {
waiting_module.waiting_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({waiting : result1, err : err, session : req.session});
     } else {
     res.render('waiting_list_admin',{waiting : result1, err : err, session : req.session});
     }
  });
};



exports.waiting_list_admin = waiting_list_admin


const waiting_details = function (req,res) {
const id = req.params.id;
waiting_module.waiting_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({waiting : result1, err : err, session : req.session});
     } else {
     res.render('waiting_details',{waiting : result1, err : err, session : req.session});
     }
});
};



exports.waiting_details = waiting_details


const waiting_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'waiting',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     waiting_module.waiting_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({waiting : result1, err : err, session : req.session});
         } else {
         res.render('waiting_edit',{waiting : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.waiting_edit = waiting_edit


const waiting_edit_save = function (req,res) {
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
      waiting_module.waiting_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./../docDyn/public/img/waiting/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./../docDyn/public/img/waiting/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             waiting_module.waiting_update(id,{waiting_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/waiting/admin/page/1');
     }
});
    })
};



exports.waiting_edit_save = waiting_edit_save


const waiting_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'waiting',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('waiting_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.waiting_add = waiting_add


const waiting_add_save = function (req,res) {
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
waiting_module.waiting_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./../docDyn/public/img/waiting/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/waiting/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    waiting_module.waiting_update(result1.insertId,{waiting_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/waiting/admin/page/1');
     }
});
    })
};



exports.waiting_add_save = waiting_add_save


const waiting_delete = function (req,res) {
const id = req.params.id;
waiting_module.waiting_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/waiting/admin/page/1');
     }
});
};



exports.waiting_delete = waiting_delete


const waiting_filter = function (req,res) {
const filter = req.params.filter;
waiting_module.waiting_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({waiting : result1, err : err, session : req.session});
     } else {
     res.render('waiting_list_admin',{waiting : result1, err : err, session : req.session});
     }
});
};



exports.waiting_filter = waiting_filter


