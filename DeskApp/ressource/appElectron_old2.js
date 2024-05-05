const { app, BrowserWindow, Notification } = require('electron')
const fs = require("fs")

const prompt = require('electron-prompt');

//MODULE
const control_module = require("./control.js")

//host file path
const dir = "./bc"
const host_pathname = dir + "/config.ini"
const portNumber = 5830

if (!fs.existsSync(dir)) {fs.mkdirSync(dir)}

if (!fs.existsSync(host_pathname)) {
    function createWindow () {

      prompt({

          title: 'Adresse IP Config',
          label: 'Entrez votre Adresse IP : ',
          inputAttrs: {
              type: 'text',
              placeholder : "192.168.1.1"
          },
          type: 'input'
      })
      .then((result) => {

        if(typeof(result) != 'undefined' && result != null && result != "") {
                
          fs.writeFileSync(host_pathname,'{"host":"http://'+result+':'+portNumber+'"}')  

          console.log("IpAdress config success")
          new Notification({
          title: "Configuration réussite",
          body: "Vous pouvez lancer votre application !"
          }).show()       
        
        } 
  
      })
      .catch((err)=>{

          console.log("IpAdress config error")
          new Notification({
          title: "Echec de Configuration",
          body: "veuillez réessayer de nouveau"
          }).show() 

      })

    }

} else {

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
      
                  width: 1024,
                  height: 768,
                  frame: false,
                  resizable : false,
                  fullscreen : true,
                  autoHideMenuBar : true,
                  alwaysOnTop : false,
                  webPreferences: {
                  webSecurity : false,
                  nodeIntegration : true,
                  devTools : false,
                  menu : false
              
                }
      
              })
      
            win.loadURL(result.host)
      
           // win.webContents.openDevTools();
      
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





