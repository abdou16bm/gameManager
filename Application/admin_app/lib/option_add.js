const database_module=require('./database');

const option_get_all = function(callback){
 let sql='SELECT * from option_add order by option_id DESC ';
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
  //console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.option_get_all = option_get_all;


const option_get_all_type = function(callback){
/* let sql='SELECT * from option_add ' +
     '\n order by option_type ASC ';*/
 let sql = "SELECT option_add.option_id, option_type, option_name, option_price, option_pic_count, group_concat(product_id)'products_limit' from option_add\n" +
     "         left join product_option_limit pol on option_add.option_id = pol.option_id\n" +
     "         group by option_add.option_id\n" +
     "         order by option_type ASC";
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
  //console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.option_get_all_type = option_get_all_type;


const option_get_one = function(option_id,callback){
 let sql='SELECT * from  option_add where option_id =?';
 database_module.db.query(sql,[option_id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.option_get_one = option_get_one;


const option_add = function(data,callback){
 let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into option_add '+fields+' values ? ';
 database_module.db.query(sql,[[values]], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.option_add = option_add;


const option_update = function(id,data,callback){
 let sql = 'update option_add set ? where option_id =?';
 database_module.db.query(sql,[data,id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.option_update = option_update;


const option_delete = function(id,callback){
 let sql = 'delete from option_add where option_id =?';
 database_module.db.query(sql,[id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.option_delete = option_delete;


const option_get_filter = function (filter_field,filter_data,callback) {
 let sql;
 if (filter_data == 'others') sql = "SELECT * from option_add where "+filter_field+ " not in (1,2)";
 else sql = "SELECT * from option_add where "+filter_field+ " in ("+filter_data+")";
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.option_get_filter = option_get_filter;


const option_get_filter_multi = function (filter_field,callback) {
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
 let sql = "select * from option" +

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


exports.option_get_filter_multi = option_get_filter_multi;


let option_count_page = function (limit,callback){
 let sql ="select CEIL(count(*)/?) as 'count_p' from  option_add ";
 database_module.db.query(sql,limit, function (error, results, fields) {
  if (error) console.log('error : ',error);
// console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;

});};
exports.option_count_page = option_count_page;


let option_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM option_add \n" +
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
exports.option_get_all_limit = option_get_all_limit;


