//BrowserWindow只能在主进程中使用
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')

class AppWindow extends BrowserWindow{
  constructor(config, fileLocation){
    const basicConfig = {
      width:800,
      height:600,
      webPreferences:{
        nodeIntegration : true
      }
    };
    const finalConfig = Object.assign(basicConfig,config);
    //const finalConfig = {...basicConfig, ...config};
    super(finalConfig);
    this.loadFile(fileLocation);
    this.once('ready-to-show',()=>{
      this.show();
    });
  }
}

app.on('ready', ()=>{
  const mainWindow = new AppWindow({},'./renderer/index.html');
  ipcMain.on('add-music-window',()=>{
    const addWindow = new AppWindow({
      width : 500,
      height : 400,
      parent : mainWindow
    },'./renderer/add.html');
  });

  ipcMain.on('select-music',()=>{
    dialog.showOpenDialog({
      properties : ['openFile','multiSelections'],
      filters : [{ name: 'Music', extensions: ['mp3']}]
    }).then(res=>{
      console.log("<<<<<<<<res========",res);
    });
  });
});

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })

// app.on('activate', function () {
//   if (mainWindow === null) createWindow()
// })
