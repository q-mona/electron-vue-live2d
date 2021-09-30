import { createStore } from 'vuex'
import axios from 'axios'


let time = '' // 定时器

export default createStore({
  state: {
    // 当前live2d信息
    live2d: {
      name: "血小板",
      path: "live2d/血小板/血小板.model.json",
      type: "moc", // moc或moc3
      voices: []
    },
    // 消息框信息
    message: {
      content: "",
      opacity: 0
    },
    // 程序信息
    config: {
      width: 300,
      height: 400,
      scale: 1,
      showBorder: true,
      autoStart: false
    },
    // 此处为总面版、设置列表和live2d列表的透明度 值为0到1
    opacity: {
      live2d: 0,
      config: 0,
      main: 0
    },
    // 当前的live2d列表头
    start: 0
  },
  mutations: {
    setLive2d(state, data) {
      for (let key in data) {
        state.live2d[key] = data[key]
      }
    },
    setPage(state, data) {
      state.start = data
    },
    setOpacity(state, data) {
      for (let key in data) {
        state.opacity[key] = data[key]
      }
    },
    setMsg(state, data) {
      for (let key in data) {
        state.message[key] = data[key]
      }
    },
    setConfig(state, data) {
      for (let key in data) {
        state.config[key] = data[key]
      }
    }
  },
  actions: {
    // 获得互动内容并显示消息框
    getMsg({ commit, dispatch }) {
      // v1.hitokoto.cn这网址会随机返回一条互动
      axios.get('https://v1.hitokoto.cn/').then(res => {
        commit('setMsg', { content: res.data.hitokoto, opacity: 1 })
        dispatch('removeMsg')
      }).catch(() => {
        commit('setMsg', { content: '糟了似乎出现了奇怪的问题，是你的问题还是我的问题呢？', opacity: 1 })
        dispatch('removeMsg')
      })
    },
    // 移除消息框
    removeMsg({ commit }) {
      // 防止重复触发setTimeOut
      clearTimeout(time)
      time = setTimeout(() => {
        commit('setMsg', { opacity: 0 })
      }, 5000);
    }
  },
  modules: {
  }
})
