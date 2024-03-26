const fs = require('fs');
const os = require('os');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;


const printConfig = fs.readFileSync('./../docDyn/printConfig.json', 'utf8')
const printConfigJson = JSON.parse(printConfig)

let printerName = printConfigJson.printer;
console.log(printerName)

async function printTicket(service_name , desk_name, desk_location, speciality_name, number, date, time, pic, callback) {
    const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: "\\\\" + os.hostname() + "\\" + printerName,
         characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
        removeSpecialCharacters: true,                            // Removes special characters - default: false
        lineCharacter: "=",                                       // Set character for lines - default: "-"
        options: {                                                   // Additional options
            timeout: 5000                                          // Connection timeout (ms) [applicable only for network printers] - default: 3000
        }
    });

    console.log(os.hostname())
    let isConnected = await printer.isPrinterConnected();
 let execute = await printer.execute();



    printer.alignCenter();
    await printer.printImage(pic);
    printer.drawLine();
    printer.newLine();
    printer.setCharacterSet("PC858_EURO");
    printer.setTextSize(4,4);
    printer.print(number);
    printer.setTextNormal();
    printer.newLine();
    printer.underline(true);
    printer.tableCustom([
        { text: "Service :", align: "LEFT", width: 0.3 },
        { text: (service_name), align: "RIGHT", width: 0.6, bold: true }
    ]);
    if (desk_name != '' && typeof desk_name != "undefined" && desk_name != null && desk_name != "null") {
        printer.tableCustom([
            { text: "Desk :", align: "LEFT", width: 0.3 },
            { text: (desk_name), align: "RIGHT", width: 0.6, bold: true }
        ]);
    }

    if (desk_location != '' && typeof desk_location != "undefined" && desk_location != null && desk_location != "null") {
        printer.tableCustom([
            { text: "Localisation :", align: "LEFT", width: 0.3 },
            { text: (desk_location), align: "RIGHT", width: 0.6, bold: true }
        ]);
    }

    if (speciality_name != '' && typeof speciality_name != "undefined" && speciality_name != null && speciality_name != "null") {
        printer.tableCustom([
            { text: "Specialite :", align: "LEFT", width: 0.3 },
            { text: (speciality_name), align: "RIGHT", width: 0.6, bold: true }
        ]);
    }
    printer.setTextNormal();
    printer.newLine();
    printer.tableCustom([
        { text: (date), align: "LEFT", width: 0.5 },
        { text: (time), align: "RIGHT", width: 0.5 }
    ]);
    printer.partialCut();

    const err = printer.execute();


    if (callback) { callback(err, isConnected) };
    return isConnected;


}


// printTicket('service web','n° 1',"Alger le :" + new Date().toLocaleDateString(),"a :" + new Date().toLocaleTimeString(),'./admin_app/public/assets/images/ah-logo.png')



exports.printTicket = printTicket;
