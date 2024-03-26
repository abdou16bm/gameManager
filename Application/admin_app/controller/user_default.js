const user_module = require('../lib/user_default');
const session_module = require('../lib/session');

const formidable = require('formidable');




let user_login = function (req,res) {

    let err = req.query.err;
    console.log(err)

    res.render('login',{err:err});
};


let user_login_check = function (req,res) {

    let username = req.body.singin_username,
        password = req.body.singin_password;

    if (username && password && username.length && password.length && username != '' && password != '') {

        console.log('admin test connection')

        user_module.user_connect(username,password,function (err,result1) {


            console.log('result1',result1)


            if (result1.loggedin == true ) {

                console.log('admin connected')

                user_module.user_get_one(result1.user_id,function (err,result2) {

                    if (err) console.log('err : ',err) ;

                    console.log('result2',result2)

                    let session_data = {

                        loggedin : true,
                        username : username,
                        name : result2[0].user_name,
                        lname : result2[0].user_lastname,
                        user_id : result2[0].user_id,
                        user_id_s : result2[0].user_id_s,
                        privid : result2[0].priv_id,
                        timeout : 3600000,
                        location : '/'
                    };

                    session_module.session_create(req,res,session_data);


                    console.log('redirect to home')

                    return res.redirect('/home');

                })
            }
            else if (result1.loggedin == true && result1.privid == 999) {

                req.session.loggedin = true;
                req.session.username = username;
                req.session.privid = result1.privid;

                console.log('root connected')


                return res.redirect('/home');
            }
            else {

                res.redirect('/?err=1');
            }

        })
    }
    else
    {
        res.redirect('/?err=1');

    }

};


let user_logout = function (req,res) {

    req.session.destroy(function (err) {
        if (err) {
            return err;
        } else {

            return res.redirect('/');
        }
    });
};



let user_edit = function (req,res) {

    res.render('profil',
        {
            session : req.session
        });
};



let user_edit_save = function (req,res) {

    let id = req.session.userid;
    let username = req.session.username;

    let form = new formidable.IncomingForm();

    var data = {};

    form.parse(req, function (err, fields, files) {
        console.log('fields',fields)

        user_module.user_connect(username,fields.password,function (err,result1){
            if (err) console.log(err)

            console.log("resultat:",result1)

            if (result1.loggedin == true){

                if (fields.passwordNew == fields.passwordNewC && fields.passwordNew != '' && fields.passwordNew.length > 6)
                {
                    let data_update = {
                        user_username : fields.username,
                        user_password : fields.passwordNew
                    }
                    user_module.user_update(id,data_update,function (err,result){
                        if (err) console.log(err)
                        console.log(result)

                        req.session.username = data_update.user_username;
                        res.render('profil',
                            {
                                session : req.session,
                                success : 'Information modifiées!'
                            });
                        // res.redirect('/profil?success=1');
                    })
                }
                else  if (fields.passwordNew == '' && fields.passwordNewC == ''){
                    let data_update = {
                        user_username : fields.username
                    }
                    user_module.user_update(id,data_update,function (err,result){
                        if (err) console.log(err)
                        console.log(result)

                        req.session.username = data_update.user_username;
                        res.render('profil',
                            {
                                session : req.session,
                                success : 'Information modifiées!'
                            });
                        // res.redirect('/profil');
                    })
                }
                else {

                    res.render('profil',
                        {
                            session : req.session,
                            err : 'Les mot de passe saise ne corespondent pas ou inferieur à 6!'
                        });
                }

            }
            else {

                res.render('profil',
                    {
                        session : req.session,
                        err : 'Votre mot de passe est incrrecte !'
                    });
            }



        })

    })
};



let user_signup_save = function (req,res) {

    const input = JSON.parse(JSON.stringify(req.body));

    user_module.user_get_filter('user_username',input.signup_username,1,function (err,result){

        if (!result.length) {

            if (input.signup_username == null || input.signup_password == null || input.signup_password_c == null || input.signup_username == undefined || input.signup_password == undefined || input.signup_password_c == undefined || input.signup_username == "" || input.signup_password == "" || input.signup_password_c == "" || input.signup_password.length < 6|| input.signup_password !==  input.signup_password_c) {

                let obj = {};
                res.statusCode = 200;
                obj.err = 400;
                obj.msg = 'error data';
                // res.send(obj);

                res.redirect('/user/admin/page/1')

            }
            else {


                let data_user = {

                    user_name    : input.user_name,
                    user_lastname : input.user_lastname,
                    /*           user_email   : input.signup_email,
                                user_phone   : input.signup_phone,*/
                    user_username   : input.signup_username,
                    user_password   : input.signup_password,
                    // user_email   : input.signup_email,

                    user_status   : 1,
                    priv_id : 3

                };


                user_module.user_add(data_user,function (err,result1) {
                    if (err) {
                        console.log('err : ',err) ;

                        let obj = {};
                        res.statusCode = 200;
                        obj.err = err;
                        obj.msg = 'Error insert';
                        // res.send(obj);

                        res.redirect('/user/admin/page/1')
                    }
                    else {
                        let session_data = {

                            loggedin : true,
                            username : data_user.user_username,
                            user_id : result1.insertId,
                            priv_id : data_user.priv_id,
                            timeout : 3600000,
                            location : '/'
                        };

                        // session_module.session_create(req,res,session_data);

                        let obj = {};
                        res.statusCode = 200;
                        obj.err = err;
                        obj.msg = 'success';
                        // res.send(obj);

                        res.redirect('/user/admin/page/1')

                    }
                })
            }
        }
        else {

            let obj = {};
            res.statusCode = 200;
            obj.err = 300;
            obj.msg = 'Error username';
            // res.send(obj);

            res.redirect('/user/admin/page/1')

        }
    })
};



exports.user_login = user_login;
exports.user_login_check = user_login_check;
exports.user_logout = user_logout;
exports.user_edit = user_edit;
exports.user_edit_save = user_edit_save;
exports.user_signup_save = user_signup_save
