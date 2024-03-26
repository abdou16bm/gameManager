const database_module=require('./database');

const product_option_get_all = function(callback){
 let sql='SELECT * from product_option order by option_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_option_get_all = product_option_get_all;


const product_option_get_one = function(option_id,callback){
 let sql='SELECT * from  product_option where option_id =?';
database_module.db.query(sql,[option_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_option_get_one = product_option_get_one;


const product_option_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into product_option '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_option_add = product_option_add;


const product_option_update = function(id,data,callback){
let sql = 'update product_option set ? where option_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_option_update = product_option_update;


const product_option_delete = function(id,callback){
let sql = 'delete from product_option where detail_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_option_delete = product_option_delete;


const product_option_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from product_option where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_option_get_filter = product_option_get_filter;


const product_option_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from product_option" +

filter+"\n" +

"group by option_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.product_option_get_filter_multi = product_option_get_filter_multi;


let product_option_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from product_option";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.product_option_count_page = product_option_count_page;


let product_option_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM product_option \n" +
// "order by ? ?\n"+
" order by option_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.product_option_get_all_limit = product_option_get_all_limit;


