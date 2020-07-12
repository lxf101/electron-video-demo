//BrowserWindow只能在主进程中使用
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
  require('devtron').install()
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration : true
    }
  })

  //mainWindow.loadFile('./renderer/index.html');
  mainWindow.loadFile('./renderer/index.html');
  ipcMain.on('message',(event,arg)=>{
    event.sender.send('reply','hello from main');
  });
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
