const { app, BrowserWindow, Notification } = require('electron');
const electron = require('electron');
const nativeTheme = electron.nativeTheme;
const superagent = require('superagent');
const path = require('path');
app.setAppUserModelId("Tipply Desktop")

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1620,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  superagent.get('https://api.github.com/repos/PandaDex/Tipply-Desktop/releases/latest')
    .set('User-Agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) return;
      const latest = res.body.name;
      const local = require('../package.json').version;
      const updateico = path.join(__dirname, 'update.png')
      const appico = path.join(__dirname, 'icon.ico');

      if (latest > local) {
        console.log('Update available')
        const updatenoti = {
          title: 'Tipply',
          body: `Dostepna jest aktualizacja: ${latest}`,
          icon: appico
        };
        noti = new Notification(updatenoti)
        noti.show()
        mainWindow.setOverlayIcon(updateico, 'Dostepna jest aktualizacja!')


        noti.on('click', () => {
          electron.shell.openExternal("https://github.com/PandaDex/Tipply-Desktop/releases/tag/Latest");
          console.log('Noti clicked');
        })
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
