const { app, globalShortcut } = require('electron')
const { loadWhatsApp, showWindow } = require('./src/window');
const { createTrayIconFor } = require('./src/tray');
const { clearServiceWorkers } = require('./src/session');

let window;
let tray;

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
  return;
}

app.on('second-instance', () => {
  if (window) {
    showWindow(window);
  }
});

const startApp = () => {
  window = loadWhatsApp();
  tray = createTrayIconFor(window, app);
  globalShortcut.register('Super+CommandOrControl+W', () => showWindow(window));
}

app.on('ready', startApp);
app.on('before-quit', clearServiceWorkers);
app.on('will-quit', globalShortcut.unregisterAll);
app.on('window-all-closed', () => app.quit());
