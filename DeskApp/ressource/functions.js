const { app, BrowserWindow, dialog, screen} = require('electron')
const prompt = require('electron-prompt');
const fs = require("fs")


function showDialogConfig (filePath) {

    prompt({

        title: 'Adresse IP Config',
        label: 'Entrez votre Adresse IP : ',
        inputAttrs: {
            type: 'text',
            placeholder : "192.168.1.1"
        },

        type: 'input'
    })
        .then((ipAddress) => {

            if(typeof(ipAddress) != 'undefined' && ipAddress != null && ipAddress != "") {

                prompt({

                    title: 'Port Config',
                    label: 'Entrez votre port : ',
                    inputAttrs: {
                        type: 'number',
                        placeholder : "8080"
                    },

                    type: 'input'
                })
                    .then((portNumber) => {

                        if(typeof(portNumber) != 'undefined' && portNumber != null && portNumber != "") {

                            if (portNumber == 5830) {

                                prompt({

                                    title: 'Option',
                                    label: "Choisissez une option",
                                    selectOptions : {

                                        "0" : "Choisir...",
                                        "1":"BORNE",
                                        "2":"TV"
                                    },

                                    type: 'select'
                                })
                                    .then((result) => {

                                        if (typeof(result) != 'undefined' && result != null && result != "") {


                                            if (result == 1) {

                                                fs.writeFileSync(filePath,'{"ipAddress":"'+ipAddress+'","port":'+portNumber+',"route":"/","size":2,"full":0,"top":0}')
                                                // app.relaunch()

                                            } else if (result == 2) {

                                                fs.writeFileSync(filePath,'{"ipAddress":"'+ipAddress+'","port":'+portNumber+',"route":"/display","size":2,"full":0,"top":0}')
                                                // app.relaunch()

                                            } else {

                                                console.log("err route !");
                                                dialog.showErrorBox("Erreur", "Veuillez choisir une option.");
                                                return 0

                                            }

                                        }
                                        const displays = screen.getAllDisplays()
                                        let displaysList = {};
                                        displays.map((display,index)=> displaysList[index] = display.label )
                                        console.log('list ',displaysList)
                                        prompt({
                                            title: 'Choisir ecran',
                                            selectOptions : displaysList,
                                            type: 'select'
                                        })
                                            .then((display) => {

                                                if (typeof(display) != 'undefined' && display != null && display != "") {
                                                    fs.writeFileSync(filePath,'{"ipAddress":"'+ipAddress+'","port":'+portNumber+',"route":"/","size":1,"full":1,"top":0,"display":"'+displaysList[display]+'"}')
                                                    app.relaunch()
                                                }
                                                else {
                                                    display = ""
                                                    console.log("err display !");
                                                    dialog.showErrorBox("Erreur", "Veuillez choisir une option.");
                                                    return 0

                                                }


                                            })


                                    })

                            } else if (portNumber == 5810) {

                                fs.writeFileSync(filePath,'{"ipAddress":"'+ipAddress+'","port":'+portNumber+',"route":"/","size":4,"full":0,"top":1}')
                                app.relaunch()

                            } else {

                                console.log("err port !");
                                dialog.showErrorBox("Erreur", "Port non valide.");
                                return 0
                            }



                        } else {

                            console.log("err port !");
                            dialog.showErrorBox("Erreur", "Entrez le port.");
                            return 0
                        }

                    })

            } else {

                console.log("err ipaddress !");
                dialog.showErrorBox("Erreur", "Entrez l'adresse IP.");
                return 0
            }

        })

}





function createWindowApp (filePath) {

    fs.readFile(filePath, 'utf-8', (err, result) => {

        if(err){

            console.log("can not read the config file :" + err.message);

        } else {


            try {

                result = JSON.parse(result)

            } catch (error) {

                console.log("err format json !");
                dialog.showErrorBox("Erreur", "Erreur de format");
                return 0

            }

            if (typeof(result) == "object") {

                if (
                    typeof(result.ipAddress) != 'undefined' && result.ipAddress != null && result.ipAddress != ""
                    && typeof(result.port) != 'undefined' && result.port != null && result.port != ""
                    && typeof(result.route) != 'undefined' && result.route != null && result.route != ""
                ) {

                    windowAppConfig(result)

                } else {

                    console.log("ipAddress or port or route not found");
                    dialog.showErrorBox("Erreur", "Adresse-IP ou port ou route non trouvé !");
                    return 0

                }

            }
            else  {

                console.log("err format json !");
                dialog.showErrorBox("Erreur", "Erreur de format");
                return 0

            }

        }

    });


}



function windowAppConfig (configFile) {

    const host = "http://" + configFile.ipAddress + ":" + configFile.port + configFile.route
    let widthApp = 1280;
    let heightApp = 720;
    let fullscreenApp = false;
    let frameApp = true;
    let resizableApp = true;
    let top = false

    if (typeof(configFile.size) != 'undefined') {

        if (configFile.size == 1) {widthApp = 800; heightApp = 600}
        else if (configFile.size == 2) {widthApp = 1280; heightApp = 720}
        else if (configFile.size == 3) {widthApp = 1920; heightApp = 1080}
        else if (configFile.size == 4) {widthApp = 400; heightApp = 700}

    }

    if (typeof(configFile.full) != 'undefined' && configFile.full == 1) {fullscreenApp = true; frameApp = false; resizableApp = true;}

    if (typeof(configFile.top) != 'undefined' && configFile.top == 1) {top = true}

    let options = {

        width: widthApp,
        height: heightApp,
        frame: frameApp,
        resizable : resizableApp,
        fullscreen : fullscreenApp,
        autoHideMenuBar : true,
        alwaysOnTop : top,
        webPreferences: {

            webSecurity : false,
            nodeIntegration : true,
            devTools : true,
            menu : false

        }

    }

    if (configFile.port == 5800) options["webPreferences"]["contextIsolation"] = false

    const displays = screen.getAllDisplays()
    console.log(displays)
    let display = null;
    if (typeof(configFile.display) != 'undefined' && configFile.display !== "")
    {
        display = configFile.display;
        display = displays.filter((element)=> element.label == configFile.display)[0];

        options.x =  display.bounds.x + 50;
        options.y = display.bounds.y + 50;
    }
    const win = new BrowserWindow(options)

/* win.openDevTools(); */
    win.webContents.on("did-fail-load", function() {
        console.log("did-fail-load");
        win.loadFile("appError.html", {query: {"host": host}});
    });

win.loadURL(host)

}


module.exports = {

    showDialogConfig,
    createWindowApp

}
