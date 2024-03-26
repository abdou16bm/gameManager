const database_module=require('./database');

const waiting_get_all = function(callback){
 let sql='SELECT * from waiting order by waiting_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.waiting_get_all = waiting_get_all;


const waiting_get_one = function(waiting_id,callback){
 let sql='SELECT * from  waiting where waiting_id =?';
database_module.db.query(sql,[waiting_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.waiting_get_one = waiting_get_one;


const waiting_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into waiting '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.waiting_add = waiting_add;


const waiting_update = function(id,data,callback){
let sql = 'update waiting set ? where waiting_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.waiting_update = waiting_update;


const waiting_delete = function(id,callback){
let sql = 'delete from waiting where waiting_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.waiting_delete = waiting_delete;


const waiting_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from waiting where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.waiting_get_filter = waiting_get_filter;


const waiting_get_filter_multi = function (filter_field,orAnd,callback) {
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
 filter += " " + orAnd + " " +fields[i] + " in ('" + filter_field[fields[i]].join("','") +"') ";
}
}
let sql = "select * from waiting" +

filter+"\n" +

"group by waiting_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.waiting_get_filter_multi = waiting_get_filter_multi;


let waiting_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from waiting";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.waiting_count_page = waiting_count_page;


let waiting_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM waiting \n" +
// "order by ? ?\n"+
" order by waiting_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.waiting_get_all_limit = waiting_get_all_limit;


