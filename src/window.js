const { BrowserWindow, shell } = require('electron');
const path = require('path');

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.131 Safari/537.36';

function loadWhatsApp(setUnreadCount, newFavIcon) {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, '../assets/512x512.png'),
    webPreferences: {
      // devTools: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // const titleRegex = /^\((\d+)\).*/;

  window.setMenuBarVisibility(false);

  window.on('close', (event) => {
    event.preventDefault();
    window.hide();
  });

  window.webContents.on('new-window', (event, url) => {
    shell.openExternal(url);
    event.preventDefault();
  });

  // let oldUnreadCount = 0;

  // window.on('page-title-updated', (event, title) => {
  //   console.log('new title:', title);

  //   regexResult = titleRegex.exec(title);
  //   if (regexResult === null) {
  //     unreadCount = 0;
  //   } else {
  //     unreadCount = Number(regexResult[1]);
  //   }

  //   console.log('Unread count: ', unreadCount);

  //   if (unreadCount != oldUnreadCount) {
  //     oldUnreadCount = unreadCount;
  //     setUnreadCount(unreadCount);
  //   }
  // });

  // window.webContents.on('page-favicon-updated', (event, favicons) => {
  //   newFavIcon(favicons[0]);
  // });

  window.loadURL('https://web.whatsapp.com/', { userAgent });

  return window;
}

function showWindow(window) {
  if (window.isVisible()) {
    window.focus();
  } else {
    window.show();
  }
}

function setWindowUnreadCount(window, count) {

}

module.exports = { loadWhatsApp, showWindow, setWindowUnreadCount };
