const database_module=require('./database');

const order_client_get_all = function(callback){
 let sql='SELECT * from order_client order by order_id DESC ';
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_client_get_all = order_client_get_all;


const order_client_get_one = function(order_id,callback){
 let sql='SELECT * from  order_client where order_id =?';
 database_module.db.query(sql,[order_id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_client_get_one = order_client_get_one;


const order_client_add = function(data,callback){
 let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into order_client '+fields+' values ? ';
 database_module.db.query(sql,[[values]], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_client_add = order_client_add;


const order_client_update = function(id,data,callback){
 let sql = 'update order_client set ? where order_id =?';
 database_module.db.query(sql,[data,id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_client_update = order_client_update;


const order_client_delete = function(id,callback){
 // let sql = 'delete from order_client where order_id =?';
 let sql = "delete from product_option\n" +
     "where detail_id in (    select detail_id from product_detail\n" +
     "                        where order_id = ?);\n" +
     "delete from product_detail\n" +
     "where order_id = ?;\n" +
     "delete from order_client\n" +
     "where order_id = ?\n";
 database_module.db.query(sql,[id,id,id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_client_delete = order_client_delete;


const order_client_get_filter = function (filter_field,filter_data,callback) {
 let sql = "SELECT * from order_client where "+filter_field+ " like '"+filter_data+"'\n" +
     "and DATE(order_in) = CURDATE()";
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_client_get_filter = order_client_get_filter;


const order_client_get_filter_multi = function (filter_field,callback) {
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
 let sql = "select * from order_client" +

filter+"\n" +

"group by order_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.order_client_get_filter_multi = order_client_get_filter_multi;


let order_client_count_page = function (limit,callback){
 let sql ="select CEIL(count(*)/?) as 'count_p' from order_client";
 database_module.db.query(sql,limit, function (error, results, fields) {
  if (error) console.log('error : ',error);
// console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;

});};
exports.order_client_count_page = order_client_count_page;


let order_client_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM order_client \n" +
    // "order by ? ?\n"+
    " order by order_id DESC \n"+
    "LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
 console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.order_client_get_all_limit = order_client_get_all_limit;


const cash_register_count_page = function (limit,callback){
  let sql ="select CEIL(count(*)/?) as 'count_p' from order_client\n" +
  "INNER JOIN waiting ON waiting.waiting_id = order_client.waiting_id\n" +
  "where order_client.order_statut = 2\n" +
  "GROUP BY order_client.waiting_id";
  database_module.db.query(sql,limit, function (error, results, fields) {
   if (error) console.log('error : ',error);
 // console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
 
 });};

 exports.cash_register_count_page = cash_register_count_page;


 let cash_register_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

  let sql ="SELECT waiting.waiting_id,waiting.waiting_date, count(*) as order_number, SUM(order_client.order_total_price) as total_price FROM order_client\n" +
  "INNER JOIN waiting ON waiting.waiting_id = order_client.waiting_id\n" +
  "where order_client.order_statut = 2\n" +
      // "order by ? ?\n"+
  "GROUP BY order_client.waiting_id\n" +
  " order by waiting.waiting_date DESC \n"+
  "LIMIT ?,?";
  
  database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {
  
  if (error) console.log('error : ',error);
  
  // console.log('results: ', results);
   console.log('fields: ', fields);
  
  if (callback){callback(error,results)};
  
  return results;
  
  });
  };
  exports.cash_register_get_all_limit = cash_register_get_all_limit;


  const cash_register_details_count_page = function (limit,id,callback){
    let sql ="select CEIL(count(*)/?) as 'count_p' from order_client\n" +
    "INNER JOIN waiting ON waiting.waiting_id = order_client.waiting_id\n" +
    "where order_client.order_statut = 2 and order_client.waiting_id = ?"
    database_module.db.query(sql,[limit,id], function (error, results, fields) {
     if (error) console.log('error : ',error);
   // console.log('results: ', results);
     if (callback){callback(error,results)};
     return results;
   
   });};
  
   exports.cash_register_details_count_page = cash_register_details_count_page;


   let cash_register_details_get_all_limit = function (id,limit1,limit2,order_value,order_type,callback){

    let sql ="select oc.*,waiting.*,user.user_username from order_client oc\n"+
    "INNER JOIN waiting ON waiting.waiting_id = oc.waiting_id\n"+
    "LEFT JOIN user ON user.user_id = oc.user_id\n"+
    "where oc.order_statut = 2 and oc.waiting_id = ?\n"+
    "order by oc.user_id DESC \n"+
    "LIMIT ?,?";
    
    database_module.db.query(sql, [id,limit1,limit2], function (error, results, fields) {
    
    if (error) console.log('error : ',error);
    
    // console.log('results: ', results);
     console.log('fields: ', fields);
    
    if (callback){callback(error,results)};
    
    return results;
    
    });
    };
    exports.cash_register_details_get_all_limit = cash_register_details_get_all_limit;


   const cash_register_details_count_page_filter = function (limit,id,filter_field,filter_data,callback){

    let filter = ""
    
    if (typeof(filter_field) != 'undefined' && filter_field != null && filter_field != "" && typeof(filter_data) != 'undefined' && filter_data != null && filter_data != "") {
      
         filter = " AND " + filter_field + " = " + filter_data

    }

    let sql ="select CEIL(count(*)/?) as 'count_p' from order_client oc\n" +
    "INNER JOIN waiting ON waiting.waiting_id = oc.waiting_id\n" +
    "where oc.order_statut = 2 and oc.waiting_id = ? " + filter
    database_module.db.query(sql,[limit,id], function (error, results, fields) {
     if (error) console.log('error : ',error);
   // console.log('results: ', results);
     if (callback){callback(error,results)};
     return results;
   
   });};
  
   exports.cash_register_details_count_page_filter = cash_register_details_count_page_filter;


   
   let cash_register_details_get_all_limit_filter = function (id,limit1,limit2,order_value,order_type,filter_field,filter_data,callback){

    let filter = ""
    
    if (typeof(filter_field) != 'undefined' && filter_field != null && filter_field != "" && typeof(filter_data) != 'undefined' && filter_data != null && filter_data != "") {
      
         filter = " AND " + filter_field + " like '%" + filter_data + "%'"

    }

    let sql ="select oc.*,waiting.*,user.user_username from order_client oc\n"+
    "INNER JOIN waiting ON waiting.waiting_id = oc.waiting_id\n"+
    "LEFT JOIN user ON user.user_id = oc.user_id\n"+
    "where oc.order_statut = 2 and oc.waiting_id = ? " + filter + "\n"+
    "order by oc.user_id\n"+
    "LIMIT ?,?";
    
    database_module.db.query(sql, [id,limit1,limit2], function (error, results, fields) {
    
    if (error) console.log('error : ',error);
    
    // console.log('results: ', results);
     console.log('fields: ', fields);
    
    if (callback){callback(error,results)};
    
    return results;
    
    });
    };


    exports.cash_register_details_get_all_limit_filter = cash_register_details_get_all_limit_filter;

 



const order_client_get_products = function (order_id,callback) {
 /*let sql = "SELECT * from order_client\n" +
     " inner join product_detail on product_detail.order_id = order_client.order_id\n"+
     " inner join product on product_detail.product_id = product.product_id\n"+
     " where order_client.order_id = ?";*/

 let sql = "SELECT  *,product_detail.detail_id \"detail_id\"\n" +
     "     ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 1 THEN CONCAT(option_name) ELSE NULL END\n" +
     "                               ORDER BY product_detail.detail_id ASC SEPARATOR \",\"),\"\") AS sauces\n" +
     "     ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 2 THEN CONCAT(option_name) ELSE NULL END\n" +
     "                               ORDER BY product_detail.detail_id ASC SEPARATOR \",\"),\"\") AS supplements\n" +
     "     ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 3 THEN CONCAT(option_name) ELSE NULL END\n" +
     "                             ORDER BY product_detail.detail_id ASC SEPARATOR \",\"),\"\") AS others\n" +
     "     ,coalesce(CONCAT(\"[\",GROUP_CONCAT( CASE WHEN option_type = 1 THEN CONCAT(option_name,\" \",option_price) ELSE NULL END\n" +
     "    ORDER BY product_detail.detail_id ASC SEPARATOR \",\"),\"]\"),\"\") AS saucesPrices\n" +
     "     ,coalesce(CONCAT(\"[\",GROUP_CONCAT( CASE WHEN option_type = 2 THEN CONCAT(option_name,\" \",option_price) ELSE NULL END\n" +
     "    ORDER BY product_detail.detail_id ASC SEPARATOR \",\"),\"]\"),\"\") AS supplementsPrices\n" +
     "     ,coalesce(CONCAT(\"[\",GROUP_CONCAT( CASE WHEN option_type = 3 THEN CONCAT(option_name,\" \",option_price) ELSE NULL END\n" +
     "    ORDER BY product_detail.detail_id ASC SEPARATOR \",\"),\"]\"),\"\") AS othersPrices\n" +
     "     ,coalesce(CONCAT(\"[\",GROUP_CONCAT(option_name,\" \",option_price,\"DA\"),\"]\"),0) \"options1\"\n" +
     "     ,coalesce(sum(option_price),0)\"options_price\",(coalesce(sum(option_price),0)+product.product_price)\"detail_price\"\n" +
     "from order_client\n" +
     "         inner join product_detail on product_detail.order_id = order_client.order_id\n" +
     "         inner join product on product_detail.product_id = product.product_id\n" +
     "         inner join category on product.cat_id = category.cat_id\n" +
     "         left join product_option  on product_detail.detail_id = product_option.detail_id\n" +
     "         left join option_add on product_option.option_id = option_add.option_id\n" +
     "where order_client.order_id = ?\n" +
     "group by product_detail.detail_id\n";

 database_module.db.query(sql,[order_id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_client_get_products = order_client_get_products;


const order_get_totalPrice = function (order_id,callback) {

 let sql = "    select sum(totalPrice) as \"totalPrice\" from product_detail\n" +
     "        inner join\n" +
     "(SELECT product_detail.detail_id\n" +
     "     ,(coalesce(sum(option_price),0)+product_price) as \"totalPrice\"\n" +
     "from order_client\n" +
     "         inner join product_detail on product_detail.order_id = order_client.order_id\n" +
     "         inner join product on product_detail.product_id = product.product_id\n" +
     "         left join product_option  on product_detail.detail_id = product_option.detail_id\n" +
     "         left join option_add on product_option.option_id = option_add.option_id\n" +
     "where order_client.order_id = ?\n" +
     "group by product_detail.detail_id) total_table\n" +
     "on total_table.detail_id = product_detail.detail_id\n" +
     "group by order_id";

 database_module.db.query(sql,[order_id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.order_get_totalPrice = order_get_totalPrice;
