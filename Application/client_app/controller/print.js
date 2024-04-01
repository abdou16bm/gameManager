const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../../admin_app/lib/doc');
const { foreignDatas_GetAll } = require('../../admin_app/lib/default_lib');
const { db } = require('../../admin_app/lib/database');
const waiting_module = require('../../admin_app/lib/waiting');
const order_client_module = require('../../admin_app/lib/order_client');
const thermal_print_module = require('../../admin_app/lib/thermal_print');
const {order_client_get_all} = require("../../admin_app/lib/order_client");

const print_ticket = function (req,res) {

    let order_id = req.params.id;

    order_client_module.order_client_get_products(order_id,(err,result1)=>{
        if (err) console.log('error',err);

        order_client_module.order_client_get_one(order_id,function (err,result2){
            if (err) console.log('error',err);

            // thermal_print_module.printTicket(result2[0].order_number,result1,"","Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/public/assets/img/ticket.png',function (err,printResult) {
            //     if (err) console.log('error',err);
            let printData = {
                "number": result2[0].order_number,
                "products":result1,
                "totalPrice":"",
                "date": "Alger le " + new Date().toLocaleDateString(),
                "time": "" + new Date().toLocaleTimeString(),
                "pic": "./../docDyn/public/assets/img/ticket.png"
            }
            if(req.baseUrl == "/api") {
                res.send({printData : printData,err : err});
            } else {
                res.render('waiting_home',{printData : printData,err : err});
            }
            // })
        })
    })
};



exports.print_ticket = print_ticket
