const { Tray, Menu, MenuItem } = require('electron');
const path = require('path');
const { showWindow } = require('./window')

function createTrayIconFor(window) {
  const tray = new Tray(path.join(__dirname, '../assets/512x512.png'));

  const showWindowMenuItem = new MenuItem({
    label: 'Show Window', click: () => showWindow(window)
  });

  const quitAppMenuItem = new MenuItem({
    label: 'Quit', click: () => {
      window.destroy();
      tray.destroy();
    }
  });

  const contextMenu = Menu.buildFromTemplate([
    showWindowMenuItem,
    { type: 'separator' },
    quitAppMenuItem
  ]);

  tray.setContextMenu(contextMenu);

  tray.on('click', () => showWindow(window));
  tray.on('double-click', () => showWindow(window));

  return tray;
}

function setTrayUnreadCount(tray, count) {

}

module.exports = { createTrayIconFor, setTrayUnreadCount };
