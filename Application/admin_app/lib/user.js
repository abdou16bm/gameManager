const database_module=require('./database');
let bcrypt = require('bcrypt');
var hash5 = require('md5');

const user_get_all = function(callback){ 
 let sql='SELECT * from user order by user_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_get_all = user_get_all;


const user_get_one = function(user_id,callback){ 
 let sql='SELECT * from  user where user_id =?';
database_module.db.query(sql,[user_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_get_one = user_get_one;


const user_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into user '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_add = user_add;


const user_update = function(id,data,callback){ 
let sql = 'update user set ? where user_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_update = user_update;


const user_delete = function(id,callback){ 
let sql = 'delete from user where user_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_delete = user_delete;


const user_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from user where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_get_filter = user_get_filter;


const user_get_filter_multi = function (filter_field,callback) {
let fields = Object.keys(filter_field);
let filter = '';
console.log(fields)


for (var i=0; i < fields.length; i++)
{
if (filter_field[fields[i]].length && i == 0)
{
if (filter == '') filter += " where ";
filter += fields[i] + " in ('" + filter_field[fields[i]].join("','") +"') ";
}
else if (filter_field[fields[i]].length && i > 0)
{
if (filter == '') filter += " where ";
filter += " or "+fields[i] + " in ('" + filter_field[fields[i]].join("','") +"') ";
}
}
let sql = "select * from user" +

filter+"\n" +

"group by user_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.user_get_filter_multi = user_get_filter_multi;


let user_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from user";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.user_count_page = user_count_page;


let user_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM user \n" +
// "order by ? ?\n"+
"where priv_id NOT IN (1,2)\n" +
" order by user_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.user_get_all_limit = user_get_all_limit;





let user_update_password = function (id,data,callback) {

    console.log('new pass :',data.user_password)
    if (typeof data.user_password !== 'undefined' && data.user_password != "" && data.user_password.length > 6 )// password change
    {
        console.log('password change');

        bcrypt.hash(data.user_password, 10, function (err, hash) {
            if (err) {
                return err;
            }
            data.user_password  = hash;

            let sql ="update user set ? where user_id = ?";


            database_module.db.query(sql, [data,id],function (error, results)
            {
                if (error) console.log("Error updating : %s ",error );

                console.log("results updating : ",results );

                if (callback) {
                    callback(error, results)
                };
                return results;

            });
        })
    }
    else {

        console.log('password dont change error');

        let error = 'password error';
        let results = null;

        if (callback) {
            callback(error, results)
        };
        return results;
    }

};


exports.user_update_password = user_update_password