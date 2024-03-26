const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../lib/doc');
const { foreignDatas_GetAll } = require('../lib/default_lib');
const { db } = require('../lib/database');
const option_module = require('../lib/option_add');


const option_list_page = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    option_module.option_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            option_module.option_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('option_add_list_page',{option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({option:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('option_add_list_page',{option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.option_list_page = option_list_page


const option_list = function (req,res) {
    option_module.option_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({option : result1, err : err, session : req.session});
        } else {
            res.render('option_add_list',{option : result1, err : err, session : req.session});
        }
    });
};



exports.option_list = option_list


const option_list_page_admin = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    option_module.option_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            option_module.option_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('option_add_list_page_admin',{option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({option:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('option_add_list_page_admin',{option : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.option_list_page_admin = option_list_page_admin


const option_list_admin = function (req,res) {
    option_module.option_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({option : result1, err : err, session : req.session});
        } else {
            res.render('option_add_list_admin',{option : result1, err : err, session : req.session});
        }
    });
};



exports.option_list_admin = option_list_admin


const option_details = function (req,res) {
    const id = req.params.id;
    option_module.option_get_one(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({option : result1, err : err, session : req.session});
        } else {
            res.render('option_add_details',{option : result1, err : err, session : req.session});
        }
    });
};



exports.option_details = option_details


const option_edit = function (req,res) {
    const id = req.params.id;
    foreignDatas_GetAll(db,db.config.database,'option',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        option_module.option_get_one(id,function (err,result1) {
            if (err) console.log('error',err);
            if(req.baseUrl == "/api") {
                res.send({option : result1, err : err, session : req.session});
            } else {
                res.render('option_add_edit',{option : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
            }
        });
    });
};



exports.option_edit = option_edit


const option_edit_save = function (req,res) {
    const id = req.params.id;
    const initPath = req.headers.referer.split('/')[req.headers.referer.split('/').length-1];
    let typeOption = req.headers.referer.split('/')[req.headers.referer.split('/').length-1];
    if (isNaN(typeOption)) typeOption = 3 ;
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
        data_update.option_type = typeOption;
        option_module.option_update(id,data_update,function (err,result1) {
            if (err) console.log('error',err);
            doc_module.uploadFile('./../docDyn/public/img/option_add/',id,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/option_add/',id,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    option_module.option_update(id,{option_pic_count:count2})

                })
            })
            if(req.baseUrl == "/api") {
                res.send({update_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/option_add/list/'+initPath);
            }
        });
    })
};



exports.option_edit_save = option_edit_save


const option_add = function (req,res) {
    foreignDatas_GetAll(db,db.config.database,'option',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        res.render('option_add_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
    });
};



exports.option_add = option_add


const option_add_save = function (req,res) {
//let input = JSON.parse(JSON.stringify(req.body));
//let data_insert = input
    const initPath = req.headers.referer.split('/')[req.headers.referer.split('/').length-1];
    let typeOption = req.headers.referer.split('/')[req.headers.referer.split('/').length-1]
    if (isNaN(typeOption)) typeOption =3;
    const options = {
        multiples : true,
        uploadDir: './../uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let input = fields;
        if (typeof input.user_id != 'undefined')  input.user_id = req.session.userid;

        let data_insert =input;
        data_insert.option_type = typeOption;
        option_module.option_add(data_insert,function (err,result1) {
            if (err) console.log('error',err);
            doc_module.uploadFile('./../docDyn/public/img/option_add/',result1.insertId,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./../docDyn/public/img/option_add/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    option_module.option_update(result1.insertId,{option_pic_count:count2})

                });             });
            if(req.baseUrl == "/api") {
                res.send({insert_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/option_add/list/'+initPath);
            }
        });
    })
};



exports.option_add_save = option_add_save


const option_delete = function (req,res) {
    const id = req.params.id;
    let typeOption = req.headers.referer.split('/')[req.headers.referer.split('/').length-1]
    if (isNaN(typeOption)) typeOption =3;
    option_module.option_delete(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({delete_result : result1, err : err, session : req.session});
        } else {
            res.redirect('/option_add/list/'+typeOption);
        }
    });
};



exports.option_delete = option_delete


const option_filter = function (req,res) {
    const filter = req.params.filter;
    option_module.option_get_filter('option_type',[filter],function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({option : result1, err : err, session : req.session});
        } else {
            res.render('option_add_list_admin',{option : result1, option_type : filter, err : err, session : req.session});
        }
    });
};



exports.option_filter = option_filter


