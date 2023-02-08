const { globalShortcut, Tray, nativeImage ,ipcMain } = require("electron");
const electron = require("electron");
const fs = require("fs");
const path = require("path");
const app = electron.app;
const currentLogFilePath = path.join(__dirname, "log.txt");
const BrowserWindow = electron.BrowserWindow;
 ipcMain.on("msg",(event,data)=>{

   fs.appendFileSync(currentLogFilePath,`${data}\n`)
 })
ipcMain.on("end",(event,data)=>{

  fs.appendFileSync(currentLogFilePath,`${data}\n`)
})

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,

    }
  });
  mainWindow.maximize();
  mainWindow.loadURL(`file://${__dirname}/dist/angular-desktop/index.html`);


  let tray = null;
  app.whenReady().then( () => {
    const iconPath = path.join(__dirname, "download.png");
    console.log(iconPath);
    tray = new Tray(nativeImage.createFromPath(iconPath));
    tray.setToolTip("This is my application.");
    tray.on("click", () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      });
  });







  mainWindow.on("ready-to-show", () => {
    console.log(`Window opened at: ${new Date().toString()}`);


    try {
      fs.appendFileSync(currentLogFilePath,`Window opened at: ${new Date().toString()}\n`)
    }catch (e) {
      console.log('e',e)
    }
  });

  mainWindow.on("closed", () => {
    console.log(`Window closed at: ${new Date().toString()}`);
    try {
      fs.appendFileSync(currentLogFilePath,`Window closed at: ${new Date().toString()}\n`)
    }catch (e) {
      console.log('e',e)
    }

  });
  // globalShortcut.register("", () => {
  //   console.log(`k press`);
  // });
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }




});
