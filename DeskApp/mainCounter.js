const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    resizable : true,
    fullscreen : false,
    autoHideMenuBar : true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
      menu : false
    }
  })
  win.loadFile('indexCounter.html')
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
