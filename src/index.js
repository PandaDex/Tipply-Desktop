const { app, BrowserWindow } = require('electron');
const path = require('path');
if (require('electron-squirrel-startup')) {
  app.quit();
}
const electron = require('electron');
const nativeTheme = electron.nativeTheme;


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1620,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL('https://app.tipply.pl');
  mainWindow.setMenu(null);
  mainWindow.setIcon(path.join(__dirname, 'icon.png'));
  nativeTheme.themeSource = 'system';
  mainWindow.setBackgroundColor('#18191a')

};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
