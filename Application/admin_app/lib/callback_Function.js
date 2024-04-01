const database_module=require('./database');

const callbackFunction = function (callback) {

    let sql='SHOW TABLES';
    database_module.db.query(sql,[], function (error, results, fields) {
    if (error) console.log('error : ',error);
    //console.log('results: ', results);
    if (callback){callback(error,results)};
    return results;
    });
        
}


module.exports = {
   
    callbackFunction

}

