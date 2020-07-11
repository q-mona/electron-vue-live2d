// 获得时间
const date = new Date()

// 鼠标点击的互动内容
const clickMsg = [
  '请在「 live2d外部 」「 边框内部 」拖动我哦~~',
  '项目开始日期为「 2020-7-10 」已经过了多久了呢',
  'Tips: 可以导入本地的live2d但确保你的json文件格式一致',
  '更多帮助请看「 https://github.com/q-mona/electron-vue-live2d 」'
]

const about = [
  '该作者很懒 不一定有时间更新版本 =。= 会js的话可以去github下源码改改',
  '项目地址「 https://github.com/q-mona/electron-vue-live2d 」有时间去看看吧 说不定会更新呢~',
  '本项目由electron+vue实现 electron的坑实在是太多了 简直劝退新手！',
  '这句话记录于「 2020-7-11 」项目基本完成一半了 赶紧写完继续考研=。=',
  '有什么建议可以私信b站ID「 10995799 」 这波啊 这波是老二次元了',
  '我用的live2d.js文件可能有点老了(也找不到新的) 有些高端live2d效果不一定可以实现'
]
// 开场白
const initMsg = '晚上好~ 现在是' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '号 ' + date.getHours() + '点' + date.getMinutes() + '分~'

export {
  clickMsg,
  initMsg,
  about
}
