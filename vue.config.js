module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'electron-vue3-live2d',
        nsis: {
          installerIcon: './public/favicon.ico',
          installerHeader: './public/favicon.ico',
          installerHeaderIcon: './public/favicon.ico',
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
