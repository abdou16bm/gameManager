let databasemodule=require('./database');


let privilege_get_all=function(id,callback){
  let sql='SELECT * from  privilege \n'+

      databasemodule.db.query(sql, function (error, results, fields) {
          if (error) console.log('error : ',error);

          //console.log('results: ', results);

          if (callback){callback(error,results)};

          return results;
      });
}

exports.privilege_get_all=privilege_get_all;
