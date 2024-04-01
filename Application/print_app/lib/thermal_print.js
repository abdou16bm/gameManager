const fs = require('fs');
const os = require('os');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;


const printConfig = fs.readFileSync('./../docDyn/printConfig.json', 'utf8')
const printConfigJson = JSON.parse(printConfig)



let printerName = printConfigJson.printer;
// console.log(printerName)
async function printTicket(number, products, totalPrice, date, time, pic, callback) {
    const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        // interface: "\\\\192.168.1.8\\pos-80",
        // interface: "\\\\i1LAPTOP-0PIFIHCU\\pos-80",
        // interface: "tcp://192.168.1.18/pos-80",
        // interface: "\\192.168.1.18\pos-80",
        // interface: "\\\\DESKTOP-1AJEE7M\\pos-80",
        // interface: "\\\\"+os.hostname()+"\\POS-80",
        // interface: "\\\\"+os.hostname()+"\\POS-80 (copy 1)",
        interface: "\\\\" + os.hostname() + "\\" + printerName,
        // characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
        removeSpecialCharacters: false,                            // Removes special characters - default: false
        lineCharacter: "=",                                       // Set character for lines - default: "-"
        options: {                                                   // Additional options
            timeout: 5000                                          // Connection timeout (ms) [applicable only for network printers] - default: 3000
        }
    });


    let isConnected = await printer.isPrinterConnected();
    // let execute = await printer.execute();
    const template = `
    <table></table>
    <center>
        <p>dsdasdas</p>
        <div style="font-weight: bold">oneone</div>
    </center>
    `;
    // execute(printer, template);


    let totalPrice1 = 0;
    printer.alignCenter();
    printer.newLine();
    printer.setTextNormal();
    printer.setTextSize(3, 3);
    printer.println(number);
    printer.newLine();
    printer.setTextNormal();
    printer.println(date + " - " + time);
    printer.newLine();

    /* products[i].cat_name for category */

    for (let i = 0; i < products.length; i++) {
        totalPrice1 += products[i].detail_price;
        printer.leftRight(products[i].product_name,products[i].detail_price + " DA");
        if (products[i].cat_name.length > 0) printer.leftRight(products[i].cat_name, "")
        // if (products[i].sauces.length > 0) printer.leftRight(products[i].sauces, "")
        // if (products[i].others.length > 0) printer.leftRight(products[i].others, "")
        printer.newLine();
    }

    printer.leftRight("Total :", totalPrice1 + " DA");
    printer.alignCenter();
    printer.setTextNormal();
    await printer.printImage(pic);
    printer.newLine();
    printer.setTextNormal();
    printer.println("Merci de votre visite et a bientot");
    printer.newLine();
    printer.setTextNormal();
    printer.println("Dreamgames - 05 55 55 83 20 - 06 58 07 00 08");

    printer.cut();

    const err = printer.execute();

    if (callback) { callback(err, isConnected) };
    return isConnected;

}


// printTicket('n° 1',"[Cheddar 80.00,Gruyère 100.00]","[Ketchup ,Mayonnaise]","Alger le :" + new Date().toLocaleDateString(),"a :" + new Date().toLocaleTimeString(),'../public/assets/img/logo.png')



exports.printTicket = printTicket;
