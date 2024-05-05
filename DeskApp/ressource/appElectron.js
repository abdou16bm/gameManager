const { app, BrowserWindow } = require('electron')
const fs = require("fs")


//MODULE
const window_module = require("./functions.js")

fileDir = "./bc";
fileName = "config.ini";
filePath = fileDir + "/" + fileName;



if (!fs.existsSync(fileDir)) {fs.mkdirSync(fileDir)}


if (!fs.existsSync(filePath)) {
   
    app.on("ready",function () {
        window_module.showDialogConfig(filePath)
    })

} else {

    app.on("ready",function () {
        window_module.createWindowApp(filePath)
    })

}





app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }

})
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')





