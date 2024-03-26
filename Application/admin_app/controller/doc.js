const fs = require('fs');
const doc = require('../lib/doc');

let doc_read = function(req,res){

    // console.log(req.params)

    // let type = req.params.id;
    let doc = req.params[0];
    // let file = req.params.file;

    // let doc_path = './../docDyn/public/'+doc;
    let doc_path = './../docDyn/public/'+doc;
    // console.log(doc_path)



    // console.log('type',type)
    // console.log('doc',doc)

    fs.readFile(doc_path,function (err, data){

        // console.log('datapdf_path : ',data)

        // res.contentType(type);
        res.send(data)

    })
}


exports.doc_read=doc_read;
