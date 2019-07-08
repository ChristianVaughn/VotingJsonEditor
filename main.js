// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
var fs = require('fs');
const { dialog } = require('electron')
const { ipcMain } = require('electron')
/*require('update-electron-app')({
  repo: 'cvaughn55/VotingJsonEditor'
})*/



var newJson = "{\"Maps\":[{\"displayName\":\"NewMap1\",\"mapName\":\"NewMap1\"},{\"displayName\":\"NewMap2\",\"mapName\":\"NewMap2\"}],\"Types\":[{\"SpecificMaps\":[{\"displayName\":\"NewMap1\",\"mapName\":\"NewMap1\"}],\"displayName\":\"NewType1\",\"typeName\":\"NewType1\"},{\"SpecificMaps\":[{\"displayName\":\"NewMap2\",\"mapName\":\"NewMap2\"}],\"displayName\":\"NewType2\",\"typeName\":\"NewType2\"}]}";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 830,
    icon:'logo2.ico',
    //transparent: true,
    //frame: false,
   // nodeIntegration: true,
    webPreferences: {
      nodeIntegration: true,
   //   preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow()

  const template = [
    {
      label: 'New JSON',
      click: function(){
        //console.log('clicky clicky hole')
        mainWindow.webContents.send('ping', newJson)
   
      }
    },
    {
      label: 'Open JSON',
          click: function(){
            //console.log('clicky clicky hole')
            dialog.showOpenDialog({ filters: [

              { name: 'json', extensions: ['json'] }
           
             ]}, function (fileNames) {
           
             if (fileNames === undefined) return;
           
             var fileName = fileNames[0];
             var idk = fs.readFileSync(fileName, 'utf-8');

             //fs.readFile(fileName, 'utf-8', function (err, data) {
                //console.log(idk);
                mainWindow.webContents.send('ping', idk)
                //document.getElementById("AddVariant").value = data;
           
             //});
           
            }); 
          }
    },
    {
      label: 'Save Json',
          click: function(){
            //console.log('clicky clicky hole')
            mainWindow.webContents.send('save', 'idk')
            ipcMain.on('saveme', (event, arg) => {
              dialog.showSaveDialog({ filters: [

                { name: 'json', extensions: ['json'] }
             
               ]}, function (fileNames) {
             
               if (fileNames === undefined) return;
             
               var fileName = fileNames[0];
               fs.writeFileSync(fileNames, arg);
            })
            
            }); 
          }
    }//,
   //{
     // role: 'toggledevtools' 

    //}
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
