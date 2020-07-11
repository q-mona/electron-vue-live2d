module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'electron-vue-live2d',
        nsis: {
          installerIcon: 'D:/workplace/electron-vue-live2d/public/favicon.ico',
          installerHeader: 'D:/workplace/electron-vue-live2d/public/favicon.ico',
          installerHeaderIcon: 'D:/workplace/electron-vue-live2d/public/favicon.ico',
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        extraResources: ['public/'],
        mac: {
          icon: '/public/favicon.ico'
        },
        win: {
          icon: '/public/favicon.ico'
        },
        linux: {
          icon: '/public/favicon.ico'
        }
      }
    }
  }
}
