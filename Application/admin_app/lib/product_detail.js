const database_module=require('./database');

const product_detail_get_all = function(callback){ 
 let sql='SELECT * from product_detail order by detail_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_detail_get_all = product_detail_get_all;


const product_detail_get_one = function(detail_id,callback){ 
 let sql='SELECT * from  product_detail where detail_id =?';
database_module.db.query(sql,[detail_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_detail_get_one = product_detail_get_one;


const product_detail_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into product_detail '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_detail_add = product_detail_add;


const product_detail_update = function(id,data,callback){ 
let sql = 'update product_detail set ? where detail_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_detail_update = product_detail_update;


const product_detail_delete = function(id,callback){ 
let sql = 'delete from product_detail where detail_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_detail_delete = product_detail_delete;


const product_detail_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from product_detail where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_detail_get_filter = product_detail_get_filter;


const product_detail_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from product_detail" +

filter+"\n" +

"group by detail_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.product_detail_get_filter_multi = product_detail_get_filter_multi;


let product_detail_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from product_detail";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.product_detail_count_page = product_detail_count_page;


let product_detail_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM product_detail \n" +
// "order by ? ?\n"+
" order by detail_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.product_detail_get_all_limit = product_detail_get_all_limit;


