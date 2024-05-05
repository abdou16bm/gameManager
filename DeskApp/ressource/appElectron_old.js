const { app, BrowserWindow, Notification } = require('electron')
const fs = require("fs")

//MODULE
const control_module = require("./control.js")

//host file path
const dir = "./bc"
const host_pathname = dir + "/config.ini"

if (!fs.existsSync(host_pathname)) {

  fs.mkdirSync(dir)
  fs.writeFileSync(host_pathname,'{"host":"http://localhost:5830"}')

}

function createWindow () {

  control_module.readHostFile(host_pathname,function (result) {

    try {

      result = JSON.parse(result)

    } catch (error) {

      console.log("err format json !")
      new Notification({
        title: "Error",
        body: "err format json !"
      }).show()

    }

    if (typeof(result) == "object") {

      const win = new BrowserWindow({

        width: 1920,
        height: 1080,
        frame: false,
        resizable : false,
        fullscreen : true,
        autoHideMenuBar : true,
        alwaysOnTop : true,
        webPreferences: {
          webSecurity : false,
          nodeIntegration : true,
          devTools : true,
          menu : false
    
        }

      })

      win.loadURL(result.host)

      win.webContents.openDevTools();

      win.webContents.on("did-fail-load", function() {
        console.log("did-fail-load");
        win.loadFile("appError.html", {query: {"host": result.host}});
        //win.loadFile('appError.html?host='+result.host);
      });

    }
    else  {
      console.log("err format json !")
      new Notification({
        title: "Error",
        body: "err format json !"
      }).show()
    }

  })

}











app.whenReady().then(createWindow)

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





