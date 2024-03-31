const database_module=require('./database');

const product_get_all = function(callback){
/* let sql='SELECT * from product' +
     '\n inner join category on product.cat_id = category.cat_id' +
     ' order by category.cat_id, product_name ASC ';*/

 let sql = "SELECT product.product_id, product_ref, product_name, product_desig,product_status,\n" +
     "       product_price, product_pic_count, product.cat_id,\n" +
     "       cat_name, cat_pic_count,group_concat(pol.option_id)'product_optionsId',\n" +
     "       group_concat(option_name)'product_optionsName' from product\n" +
     "inner join category on product.cat_id = category.cat_id\n" +
     "left join product_option_limit pol on product.product_id = pol.product_id\n" +
     "left join option_add oa on pol.option_id = oa.option_id\n" +
     "         group by product.product_id\n" +
     "order by category.cat_id, product_name ASC\n"

 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_get_all = product_get_all;


const product_get_one = function(product_id,callback){
 let sql='SELECT * from  product where product_id =?';
 database_module.db.query(sql,[product_id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_get_one = product_get_one;


const product_add = function(data,callback){
 let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into product '+fields+' values ? ';
 database_module.db.query(sql,[[values]], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_add = product_add;


const product_update = function(id,data,callback){
 let sql = 'update product set ? where product_id =?';
 database_module.db.query(sql,[data,id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_update = product_update;


const product_delete = function(id,callback){
 let sql = 'delete from product where product_id =?';
 database_module.db.query(sql,[id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_delete = product_delete;


const product_get_filter = function (filter_field,filter_data,callback) {
 let sql = "SELECT * from product where "+filter_field+ " like '"+filter_data+"'";
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_get_filter = product_get_filter;


const product_get_filter_multi = function (filter_field,callback) {
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
 let sql = "select * from product" +

filter+"\n" +

"group by product_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.product_get_filter_multi = product_get_filter_multi;


let product_count_page = function (limit,callback){
 let sql ="select CEIL(count(*)/?) as 'count_p' from product";
 database_module.db.query(sql,limit, function (error, results, fields) {
  if (error) console.log('error : ',error);
// console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;

});};
exports.product_count_page = product_count_page;


let product_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM product \n" +
    // "order by ? ?\n"+
    " order by product_id DESC \n"+
    "LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
 console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.product_get_all_limit = product_get_all_limit;


