'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
// import path from 'path'
const { shell } = require('electron')
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 600,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      plugins: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  createMenu()
}

// 设置菜单栏
function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'live2d',
        submenu: [
          {
            role: 'about'
          },
          {
            role: 'quit'
          }]
      }]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}

// 设置开机自启
const ex = process.execPath
ipcMain.on('auto-start', (e, val) => {
  if (val) {
    // 开机自启
    app.setLoginItemSettings({
      openAtLogin: true,
      path: ex,
      args: []
    })
  } else {
    // 关闭开机自启
    app.setLoginItemSettings({
      openAtLogin: false,
      path: ex,
      args: []
    })
  }
})

ipcMain.on('win-reload', () => {
  // win.reload()
  const content = shell.openItem('D:/workplace/electron-vue-live2d/dist_electron/win-unpacked/resources/public/live2d/live2d-widget-model-chitose/assets/chitose.model.json')
  console.log(content)
})

// 退出live2d
ipcMain.on('win-close', e => {
  // let appTray = ''
  // 简易的托盘功能bug多懒得写了 直接取消了
  // // 当托盘最小化时，右击有一个菜单显示，这里进设置一个退出的菜单
  // const trayMenuTemplate = [{ // 系统托盘图标目录
  //   label: '退出',
  //   click: function () {
  //     app.quit(); // 点击之后退出应用
  //   }
  // }];
  // // 创建托盘实例
  // appTray = new Tray('public/favicon.ico')
  // // 图标的上下文菜单
  // const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  // // 隐藏主窗口
  // // win.hide();
  // // 设置托盘悬浮提示
  // appTray.setToolTip('live2d测试版');
  // // 设置托盘菜单
  // appTray.setContextMenu(contextMenu);

  app.quit()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
