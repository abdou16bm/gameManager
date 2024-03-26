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

            thermal_print_module.printTicket(result2[0].order_number,result1,"","Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/public/assets/img/ticket.png',function (err,printResult) {
                if (err) console.log('error',err);

                if(req.baseUrl == "/api") {
                    res.send({err : err});
                } else {
                    res.render('waiting_home',{err : err});
                }
            })
        })
    })


    /*   let service_id = req.params.id;
       let waiting_id,waiting_total,waiting_remaining;
       let dateNow = new Date().toISOString().slice(0, 10).replace('T', ' ');
       let timeNow = new Date().toLocaleTimeString();

       waiting_module.waiting_get_all(function (err,result1) {
           if (err) console.log('error',err);

           order_client_module.order_client_get_all(function (err,result2) {
               if (err) console.log('error',err);

               waiting_module.waiting_get_filter_multi({waiting_date:[new Date().toISOString().slice(0, 10).replace('T', ' ')],service_id:[service_id]},"and",function (err,result4) {
                   if (err) console.log('error',err);

                   // console.log(result4)

                   if(result4.length == 0) {
                       waiting_module.waiting_add({waiting_date:dateNow,service_id:service_id,waiting_total : 1,waiting_remaining:1},function (err,result5) {
                           waiting_total = 1
                           waiting_id = result5.insertId;
                       })
                   }
                   else {
                       waiting_total = result4[0].waiting_total + 1;
                       waiting_remaining = result4[0].waiting_remaining + 1;
                       waiting_id = result4[0].waiting_id;
                   }

                   waiting_module.waiting_update(waiting_id,{waiting_total:waiting_total,waiting_remaining:waiting_remaining},function (err,result6) {
                       if (err) console.log('error',err);

                       client_module.client_add({client_number:String.fromCharCode("A".charCodeAt(0)+result3[0].service_id-1)+waiting_total,waiting_id:waiting_id,client_in:new Date(),client_statut:0})

                       console.log(result3[0].service_title,String.fromCharCode("A".charCodeAt(0)+result3[0].service_id-1)+waiting_total,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString())

                       //print module enabled
                       thermal_print_module.printTicket(result3[0].service_title,String.fromCharCode("A".charCodeAt(0)+result3[0].service_id-1)+waiting_total,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/public/assets/images/ticket.png',function (err,printResult) {

                           if(req.baseUrl == "/api") {
                               res.send({service: result2, waiting : result1,err : err, session : req.session});
                           } else {
                               res.render('waiting_home',{service: result2, waiting : result1,err : err, session : req.session});
                           }
                       })

                   })


               })

           })
       })*/
};



exports.print_ticket = print_ticket
