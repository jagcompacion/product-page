const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let productWindow;
let newProductWindow;

function createWindow() {
  productWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { webSecurity: !isDev } });
  productWindow.setMenu(null);
  productWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  productWindow.on('closed', () => productWindow = null);

  newProductWindow = new BrowserWindow({ width: 400, height: 480, parent: productWindow, show: false });
  newProductWindow.setMenu(null);
  newProductWindow.loadURL(isDev ? 'http://localhost:3000/new-product' : `file://${path.join(__dirname, '../build/index.html')}`);
  newProductWindow.on('close', e => {
    e.preventDefault();
    newProductWindow.hide();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (productWindow === null) {
    createWindow();
  }
});

ipcMain.on('toggle-new-product', () => {
  newProductWindow.show();
});

ipcMain.on('save-new-product', (e, args) => {
  productWindow.webContents.send('product-saved', args);
  newProductWindow.hide();
});