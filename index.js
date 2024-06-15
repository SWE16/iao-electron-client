const { app, shell, BrowserWindow, webContents } = require('electron/main');
const path = require('node:path');

app.disableHardwareAcceleration();

let baseURL = 'http://localhost:3000';

app.on('open-url', function (event, url) {
    win.loadURL(url);
});

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js'),
        // },
    });

    // win.loadFile(path.join(__dirname, 'index.html'));
    win.loadURL(baseURL);

    win.webContents.setWindowOpenHandler(function (details) {
        if (details.url.includes('localhost')) {
            win.loadURL(details.url);
        }
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
