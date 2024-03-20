const { app, BrowserWindow, ipcMain } = require('electron');
const Main = require('electron/main');
const path = require('path');
const db = require('./Database/DatabaseLocal');
const _Log = require('./logger');
const sqlite3 = require('sqlite3').verbose();

let _DB = undefined;

let MainWindow = undefined;
let SearchWindow = undefined;
let LogsWindow = undefined;

const MainWindowSetup = () => {
    MainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, '/Views/Preload/HomePreload.js')
      }
    })
    // MainWindow.webContents.openDevTools({ mode: 'detach'});
    MainWindow.loadFile('Views/Pages/Home.html');
  }

const SearchWindowSetup = async () => {
  SearchWindow = new BrowserWindow( {
    width: 800,
    height: 200,
    fullScreenable: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '/Views/Preload/SearchPreload.js')
    }
  })
  // SearchWindow.webContents.openDevTools({mode: 'detach'});
  SearchWindow.loadFile('Views/Pages/Search.html');
}

const LogsWindowSetup = async () => {
  LogsWindow = new BrowserWindow( {
    width: 800,
    height: 800,
    fullScreenable: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, '/Views/Preload/HomePreload.js')
    }
  })
  // LogsWindow.webContents.openDevTools({mode: 'detach'});
  LogsWindow.loadFile('Views/Pages/Logs.html');
}


  ipcMain.handle('GetAllCartoline', async (event, someArgument) => {
    await _Log.LogInfo('GetAllCartoline called()');
    return await _DB.GetAllCartoline();
    
  })

  ipcMain.handle('InsertCartoline', async (event, arg) => {
    await _Log.LogInfo('InsertingCartoline called() arg: ' + arg);
    return await _DB.InsertCartoline(arg);
    
  })

  ipcMain.handle('UpdateCartoline', async (event, arg) => {
    await _Log.LogInfo('UpdateCartoline called() arg: ' + arg);
    return await _DB.UpdateCartoline(arg);
    
  })

  ipcMain.handle('View', async (event, arg) =>{
    await _Log.LogInfo('SearchView called() arg: ' + arg);
    if(arg == 'Search'){
      return await SearchWindowSetup();
    }
    if(arg == 'Logs'){
      return await LogsWindowSetup();
    }
  })


  ipcMain.handle('Filter', async(event, arg)=> {
    await _Log.LogInfo('Filter setted to: ' + arg);
    if(arg != undefined){      
        MainWindow.webContents.send('SetFilter', arg );     
    }
  })

  ipcMain.handle('GetLogs', async(event, arg)=> {
    await _Log.LogInfo('getLogs(): ' + arg);    
    return await _Log.Logjet();
  })

  ipcMain.handle('SyncDatabase', async(event, arg)=> {
       //TO DO
    return await true;
  })

  app.on('window-all-closed', async () => {
    await _Log.LogInfo('Application Closing');
    if (process.platform !== 'darwin') app.quit()


  })

  app.whenReady().then(async() => {
    MainWindowSetup();
    await _Log.LogFile();
    await _Log.LogInfo('Application Start');
    _DB = new db.DatabaseLocal(sqlite3, _Log);
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) MainWindowSetup();
    })
  })
  

