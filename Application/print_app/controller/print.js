const formidable = require('formidable');
const fs = require('fs');
const thermal_print_module = require('../lib/thermal_print');

const print_ticket = function (req,res) {
    const {service_name, desk_name, desk_location, speciality_name,number,date,time,pic} = req.body;
    console.log('print')
    console.log(req.body)
    thermal_print_module.printTicket(service_name, desk_name, desk_location, speciality_name ,number,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/images/ticket.png',function (err,printResult) {
    // thermal_print_module.printTicket('service_title',String.fromCharCode("A".charCodeAt(0)+2-1)+4,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/images/ticket.png',function (err,printResult) {
        if(req.baseUrl == "/api") {
            res.send({/*err : err, */session : req.session});
        } else {
            res.render('waiting_home',{/*err : err, */session : req.session});
        }
    })
};


const print_ticketGet = function (req,res) {

    /*let dataPrint = req.query.data;

    dataPrint = JSON.parse(dataPrint);*/

    console.log(req.query)
    let lang = req.query.lang

    const {service_name, desk_name, desk_location, speciality_name,number,date,time,pic} = req.query;
    console.log('print')
    // console.log(req.body)
    thermal_print_module.printTicket(service_name, desk_name, desk_location, speciality_name ,number,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/images/ticket.png',function (err,printResult) {
    // thermal_print_module.printTicket('service_title',String.fromCharCode("A".charCodeAt(0)+2-1)+4,"Alger le " + new Date().toLocaleDateString(),"" + new Date().toLocaleTimeString(),'./../docDyn/images/ticket.png',function (err,printResult) {
        if(req.baseUrl == "/api") {
            // res.send({/*err : err, */session : req.session});
            //res.redirect(req.headers.referer+'?print=1')
            res.redirect(req.headers.referer+'waiting/'+lang+'?print=1')
        } else {
            res.render('waiting_home',{/*err : err, */session : req.session});
        }
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
