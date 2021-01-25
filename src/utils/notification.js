window.addEventListener('offline', () => {
  new window.Notification('看板娘提醒：网络已断开', { title: '看板娘提醒：网络已断开', body: '部分功能如(聊天信息、图片识别)将无法使用' })
})
window.addEventListener('online', () => {
  new window.Notification('看板娘提醒：网络已连接', { title: '看板娘提醒：网络已连接', body: '尽情冲浪把' })
})