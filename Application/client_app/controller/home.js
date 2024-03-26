const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../../admin_app/lib/doc');
const { foreignDatas_GetAll } = require('../../admin_app/lib/default_lib');
const { db } = require('../../admin_app/lib/database');


const home = function (req,res) {
    res.render("order_init");
};

exports.home = home
