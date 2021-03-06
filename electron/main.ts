import {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import isDev from 'electron-is-dev'
import settings from "electron-settings";
const electronLog = require('electron-log');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    win.webContents.openDevTools();
    // Hot Reloading on 'node_modules/.bin/electronPath'
  }
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  const setSettings = async (key, obj)=>{
    if(settings.hasSync(key)){
      settings.unsetSync(key);
    }
    settings.setSync(key, obj);
  }

  const getSettings = async (key)=>{
    return settings.getSync(key);
  }

// restaura o banco a partir do remote
  ipcMain.handle("test-api", (e,args) => {
    return "AQUI";
  });

// restaura o banco a partir do remote
  ipcMain.handle("is-dev", () => {
    electronLog.info("HELLO LOG")
    return isDev;
  });

// restaura o banco a partir do remote
  ipcMain.handle("set-settings", (e,args) => {
    setSettings(args.key, args.object);
  });

// restaura o banco a partir do remote
  ipcMain.handle("get-settings", (e,args) => {
    return getSettings(args);
  });
});
