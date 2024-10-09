const { app, globalShortcut } = require('electron');
const { loadWhatsApp, showWindow, setWindowUnreadCount } = require('./src/window');
const { createTrayIconFor, setTrayUnreadCount } = require('./src/tray');
const { clearServiceWorkers } = require('./src/session');

let window;
let tray;

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
}

app.on('second-instance', () => {
  if (window) {
    showWindow(window);
  }
});

app.on('ready', () => {
  window = loadWhatsApp();
  tray = createTrayIconFor(window);
  globalShortcut.register('Super+CommandOrControl+W', () => showWindow(window));
});

app.on('before-quit', () => {
  clearServiceWorkers();
  globalShortcut.unregisterAll();
});

// function setUnreadMsgCount(count) {
//   if (tray !== undefined) {
//     setTrayUnreadCount(tray, count);
//   }
//   setWindowUnreadCount(window, count);
// }

// function newFavIcon(url) {
//   if (tray !== undefined) {
//     tray.icon
//   }
//   window.icon
// }