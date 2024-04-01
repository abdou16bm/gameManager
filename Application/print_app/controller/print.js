const formidable = require('formidable');
const fs = require('fs');
const thermal_print_module = require('../lib/thermal_print');

const print_ticket = function (req,res) {
    const {number, products, totalPrice, date, time, pic} = req.body;
    console.log('print')
    console.log(req.body)
    thermal_print_module.printTicket(number, products, totalPrice,date, time,pic,function (err,printResult) {
        // thermal_print_module.printTicket('service_title',String.fromCharCode("A".charCodeAt(0)+2-1)+4,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/images/ticket.png',function (err,printResult) {
        res.send({printResult : printResult, session : req.session});
    })
};


const print_ticketGet = function (req,res) {

    let dataPrint = req.query;

    const {number, products, totalPrice, date, time, pic} = dataPrint;


    thermal_print_module.printTicket(number, products, totalPrice,date, time,pic,function (err,printResult) {
        // thermal_print_module.printTicket('service_title',String.fromCharCode("A".charCodeAt(0)+2-1)+4,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/images/ticket.png',function (err,printResult) {
        res.send({printResult : printResult, session : req.session});

    })
};


const print_test = function (req,res) {

    // thermal_print_module.printTicket('service_title',String.fromCharCode("A".charCodeAt(0)+2-1)+4,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/images/ticket.png',function (err,printResult) {

    // console.log(err)
    console.log("print")
    // console.log(printResult)

    res.send({data:'print',err:null})
    /* if(req.baseUrl == "/api") {
            res.send({service: result2, waiting : result1,err : err, session : req.session});
        } else {
            res.render('waiting_home',{service: result2, waiting : result1,err : err, session : req.session});
        }*/
    // })
};



exports.print_ticket = print_ticket
exports.print_ticketGet = print_ticketGet
exports.print_test = print_test
