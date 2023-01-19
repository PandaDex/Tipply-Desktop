const { app, BrowserWindow, Notification } = require('electron');
const superagent = require('superagent');
app.setAppUserModelId("Tipply Desktop")


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

superagent.get('https://api.github.com/repos/PandaDex/Tipply-Desktop/releases/latest').set('User-Agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13').set('Content-Type', 'application/json').end((err, res) => {
  const latest = res.body.name;
  const local = require('../package.json').version;
  
 if(latest > local) {
  const updateico = path.join(__dirname, 'update.ico')
  let iconAddress = path.join(__dirname, 'icon.png');
  const notif={
        title: 'Tipply',
        body: `Dostepna jest nowa aktualizacja: ${latest}`,
        icon: iconAddress
      };
  noti = new Notification(notif)
  noti.show()
  noti.on('click', ()=>{
    electron.shell.openExternal("https://github.com/PandaDex/Tipply-Desktop/releases/tag/Latest");
  })
  mainWindow.setOverlayIcon(updateico, 'Dostepna jest aktualizacja!')
 }
})

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
