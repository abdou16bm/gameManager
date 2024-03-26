const database_module=require('./database');

const option_cat_get_all = function(callback){ 
 let sql='SELECT * from option_cat order by option_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.option_cat_get_all = option_cat_get_all;


const option_cat_get_one = function(option_id,callback){ 
 let sql='SELECT * from  option_cat where option_id =?';
database_module.db.query(sql,[option_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.option_cat_get_one = option_cat_get_one;


const option_cat_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into option_cat '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.option_cat_add = option_cat_add;


const option_cat_update = function(id,data,callback){ 
let sql = 'update option_cat set ? where option_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.option_cat_update = option_cat_update;


const option_cat_delete = function(id,callback){ 
let sql = 'delete from option_cat where option_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.option_cat_delete = option_cat_delete;


const option_cat_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from option_cat where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.option_cat_get_filter = option_cat_get_filter;


const option_cat_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from option_cat" +

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


exports.option_cat_get_filter_multi = option_cat_get_filter_multi;


let option_cat_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from option_cat";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.option_cat_count_page = option_cat_count_page;


let option_cat_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM option_cat \n" +
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
exports.option_cat_get_all_limit = option_cat_get_all_limit;


